import mongoose from 'mongoose';
import Project from '../models/Project.js';
import AuditLog from '../models/AuditLog.js';
import { isDbConnected } from '../config/db.js';

// ==========================================
// PUBLIC PORTFOLIO CONTROLLER METHODS
// ==========================================

export const getPublicProjects = async (req, res, next) => {
  try {
    if (!isDbConnected()) {
      return res.status(200).json({
        success: true,
        data: [],
        count: 0,
        total: 0,
        message: 'Portfolio database is temporarily connecting. Please check back shortly.',
      });
    }

    const { category } = req.query;
    const page = Math.max(1, parseInt(req.query.page || '1', 10));
    const limit = Math.min(50, Math.max(1, parseInt(req.query.limit || '12', 10)));
    const skip = (page - 1) * limit;

    // Strict public visibility filter: published only, not archived
    const query = {
      publicationStatus: 'published',
      status: { $ne: 'archived' },
    };

    if (category && category !== 'all') {
      const validCategories = ['residential', 'commercial', 'interiors', 'exteriors', 'turnkey'];
      if (validCategories.includes(category)) {
        query.category = category;
      }
    }

    const [projects, total] = await Promise.all([
      Project.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit),
      Project.countDocuments(query),
    ]);

    return res.status(200).json({
      success: true,
      count: projects.length,
      total,
      page,
      pages: Math.ceil(total / limit) || 1,
      data: projects.map((p) => p.toPublicJSON()),
    });
  } catch (error) {
    next(error);
  }
};

export const getPublicProjectBySlug = async (req, res, next) => {
  try {
    if (!isDbConnected()) {
      return res.status(503).json({
        success: false,
        message: 'Portfolio service is temporarily unavailable. Please retry shortly.',
      });
    }

    const { slug } = req.params;
    if (!slug || typeof slug !== 'string') {
      return res.status(400).json({
        success: false,
        message: 'Invalid project identifier.',
      });
    }

    // Must be published and not archived
    const project = await Project.findOne({
      slug: slug.toLowerCase().trim(),
      publicationStatus: 'published',
      status: { $ne: 'archived' },
    });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'The requested construction project portfolio was not found or is currently unavailable.',
      });
    }

    return res.status(200).json({
      success: true,
      data: project.toPublicJSON(),
    });
  } catch (error) {
    next(error);
  }
};

// ==========================================
// ADMIN PORTAL CONTROLLER METHODS
// ==========================================

export const getAdminProjects = async (req, res, next) => {
  try {
    if (!isDbConnected()) {
      return res.status(200).json({
        success: true,
        data: [],
        total: 0,
        message: 'Database offline — admin projects cannot be retrieved.',
      });
    }

    const { search, category, status, publicationStatus } = req.query;
    const page = Math.max(1, parseInt(req.query.page || '1', 10));
    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit || '20', 10)));
    const skip = (page - 1) * limit;

    const query = {};

    if (search && typeof search === 'string' && search.trim()) {
      const sanitizedSearch = search.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      query.$or = [
        { title: { $regex: sanitizedSearch, $options: 'i' } },
        { location: { $regex: sanitizedSearch, $options: 'i' } },
      ];
    }

    if (category && category !== 'all') {
      query.category = category;
    }

    if (status && status !== 'all') {
      query.status = status;
    }

    if (publicationStatus && publicationStatus !== 'all') {
      query.publicationStatus = publicationStatus;
    }

    const [projects, total] = await Promise.all([
      Project.find(query)
        .populate('createdBy', 'name email')
        .populate('updatedBy', 'name email')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Project.countDocuments(query),
    ]);

    return res.status(200).json({
      success: true,
      data: projects,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit) || 1,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getAdminProjectById = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: 'Invalid project ID format.' });
    }

    if (!isDbConnected()) {
      return res.status(503).json({ success: false, message: 'Database currently offline.' });
    }

    const project = await Project.findById(id)
      .populate('createdBy', 'name email')
      .populate('updatedBy', 'name email');

    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found.' });
    }

    return res.status(200).json({
      success: true,
      data: project,
    });
  } catch (error) {
    next(error);
  }
};

export const createProject = async (req, res, next) => {
  try {
    if (!isDbConnected()) {
      return res.status(503).json({ success: false, message: 'Database currently offline.' });
    }

    const {
      title,
      slug,
      category,
      description,
      objectives,
      location,
      status,
      publicationStatus,
      coverImage,
      gallery,
      milestones,
      startDate,
      completionDate,
    } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({ success: false, message: 'Project title is required.' });
    }

    if (!category || !['residential', 'commercial', 'interiors', 'exteriors', 'turnkey'].includes(category)) {
      return res.status(400).json({ success: false, message: 'Valid project category is required.' });
    }

    if (!description || !description.trim()) {
      return res.status(400).json({ success: false, message: 'Public project description is required.' });
    }

    if (!location || !location.trim()) {
      return res.status(400).json({ success: false, message: 'City/area location is required.' });
    }

    // Format slug
    let finalSlug = slug;
    if (!finalSlug || !finalSlug.trim()) {
      finalSlug = title
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');
    } else {
      finalSlug = finalSlug.toLowerCase().trim().replace(/[\s_-]+/g, '-');
    }

    // Check slug uniqueness
    const existing = await Project.findOne({ slug: finalSlug });
    if (existing) {
      return res.status(409).json({
        success: false,
        message: `A project with URL slug "${finalSlug}" already exists. Please customize the slug.`,
      });
    }

    const project = new Project({
      title: title.trim(),
      slug: finalSlug,
      category,
      description: description.trim(),
      objectives: Array.isArray(objectives) ? objectives.map((o) => String(o).trim()).filter(Boolean) : [],
      location: location.trim(),
      status: ['planned', 'ongoing', 'completed', 'archived'].includes(status) ? status : 'planned',
      publicationStatus: ['draft', 'published'].includes(publicationStatus) ? publicationStatus : 'draft',
      coverImage: typeof coverImage === 'string' ? coverImage.trim() : '',
      gallery: Array.isArray(gallery) ? gallery : [],
      milestones: Array.isArray(milestones) ? milestones : [],
      startDate: startDate ? new Date(startDate) : null,
      completionDate: completionDate ? new Date(completionDate) : null,
      createdBy: req.user?._id || null,
      updatedBy: req.user?._id || null,
    });

    await project.save();

    // Audit log
    await AuditLog.create({
      userId: req.user?._id || null,
      userEmail: req.user?.email || 'admin',
      action: 'PROJECT_CREATED',
      category: 'ADMIN_ACTION',
      ipAddress: req.ip || 'unknown',
      userAgent: req.headers['user-agent'] || 'unknown',
      status: 'SUCCESS',
      details: {
        projectId: project._id,
        title: project.title,
        slug: project.slug,
        category: project.category,
        publicationStatus: project.publicationStatus,
      },
    }).catch((e) => console.error('AuditLog error:', e.message));

    return res.status(201).json({
      success: true,
      message: 'Construction project created successfully.',
      data: project,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: 'A project with this title or slug already exists.',
      });
    }
    next(error);
  }
};

export const updateProject = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: 'Invalid project ID format.' });
    }

    if (!isDbConnected()) {
      return res.status(503).json({ success: false, message: 'Database currently offline.' });
    }

    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found.' });
    }

    const {
      title,
      slug,
      category,
      description,
      objectives,
      location,
      status,
      publicationStatus,
      coverImage,
      gallery,
      milestones,
      startDate,
      completionDate,
    } = req.body;

    if (title) project.title = title.trim();
    if (category && ['residential', 'commercial', 'interiors', 'exteriors', 'turnkey'].includes(category)) {
      project.category = category;
    }
    if (description) project.description = description.trim();
    if (location) project.location = location.trim();
    if (status && ['planned', 'ongoing', 'completed', 'archived'].includes(status)) {
      project.status = status;
    }
    if (publicationStatus && ['draft', 'published'].includes(publicationStatus)) {
      project.publicationStatus = publicationStatus;
    }
    if (coverImage !== undefined) project.coverImage = typeof coverImage === 'string' ? coverImage.trim() : '';
    if (Array.isArray(objectives)) {
      project.objectives = objectives.map((o) => String(o).trim()).filter(Boolean);
    }
    if (Array.isArray(gallery)) project.gallery = gallery;
    if (Array.isArray(milestones)) project.milestones = milestones;
    if (startDate !== undefined) project.startDate = startDate ? new Date(startDate) : null;
    if (completionDate !== undefined) project.completionDate = completionDate ? new Date(completionDate) : null;

    if (slug && slug.trim() && slug.trim() !== project.slug) {
      const newSlug = slug.toLowerCase().trim().replace(/[\s_-]+/g, '-');
      const conflict = await Project.findOne({ slug: newSlug, _id: { $ne: project._id } });
      if (conflict) {
        return res.status(409).json({ success: false, message: `Slug "${newSlug}" is already taken.` });
      }
      project.slug = newSlug;
    }

    project.updatedBy = req.user?._id || null;
    await project.save();

    // Audit log
    await AuditLog.create({
      userId: req.user?._id || null,
      userEmail: req.user?.email || 'admin',
      action: 'PROJECT_UPDATED',
      category: 'ADMIN_ACTION',
      ipAddress: req.ip || 'unknown',
      userAgent: req.headers['user-agent'] || 'unknown',
      status: 'SUCCESS',
      details: {
        projectId: project._id,
        title: project.title,
        publicationStatus: project.publicationStatus,
        status: project.status,
      },
    }).catch((e) => console.error('AuditLog error:', e.message));

    return res.status(200).json({
      success: true,
      message: 'Project updated successfully.',
      data: project,
    });
  } catch (error) {
    next(error);
  }
};

export const publishProject = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { publicationStatus } = req.body;

    if (!['draft', 'published'].includes(publicationStatus)) {
      return res.status(400).json({ success: false, message: 'Invalid publication status value.' });
    }

    const project = await Project.findByIdAndUpdate(
      id,
      { $set: { publicationStatus, updatedBy: req.user?._id || null } },
      { new: true }
    );

    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found.' });
    }

    await AuditLog.create({
      userId: req.user?._id || null,
      userEmail: req.user?.email || 'admin',
      action: publicationStatus === 'published' ? 'PROJECT_PUBLISHED' : 'PROJECT_UNPUBLISHED',
      category: 'ADMIN_ACTION',
      ipAddress: req.ip || 'unknown',
      userAgent: req.headers['user-agent'] || 'unknown',
      status: 'SUCCESS',
      details: { projectId: project._id, title: project.title, publicationStatus },
    }).catch((e) => console.error('AuditLog error:', e.message));

    return res.status(200).json({
      success: true,
      message: `Project ${publicationStatus === 'published' ? 'published' : 'moved to draft'} successfully.`,
      data: project,
    });
  } catch (error) {
    next(error);
  }
};

export const archiveProject = async (req, res, next) => {
  try {
    const { id } = req.params;

    const project = await Project.findByIdAndUpdate(
      id,
      {
        $set: {
          status: 'archived',
          publicationStatus: 'draft', // Archived projects are automatically un-published
          updatedBy: req.user?._id || null,
        },
      },
      { new: true }
    );

    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found.' });
    }

    await AuditLog.create({
      userId: req.user?._id || null,
      userEmail: req.user?.email || 'admin',
      action: 'PROJECT_ARCHIVED',
      category: 'ADMIN_ACTION',
      ipAddress: req.ip || 'unknown',
      userAgent: req.headers['user-agent'] || 'unknown',
      status: 'SUCCESS',
      details: { projectId: project._id, title: project.title },
    }).catch((e) => console.error('AuditLog error:', e.message));

    return res.status(200).json({
      success: true,
      message: 'Project archived successfully and removed from public view.',
      data: project,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteProject = async (req, res, next) => {
  try {
    const { id } = req.params;
    const project = await Project.findByIdAndDelete(id);

    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found.' });
    }

    await AuditLog.create({
      userId: req.user?._id || null,
      userEmail: req.user?.email || 'admin',
      action: 'PROJECT_DELETED',
      category: 'ADMIN_ACTION',
      ipAddress: req.ip || 'unknown',
      userAgent: req.headers['user-agent'] || 'unknown',
      status: 'SUCCESS',
      details: { projectId: id, title: project.title },
    }).catch((e) => console.error('AuditLog error:', e.message));

    return res.status(200).json({
      success: true,
      message: 'Project record deleted successfully.',
    });
  } catch (error) {
    next(error);
  }
};

export const uploadProjectImage = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No image file uploaded or invalid file format.',
      });
    }

    // Relative web URL served by Express static /uploads
    const imageUrl = `/uploads/projects/${req.file.filename}`;

    await AuditLog.create({
      userId: req.user?._id || null,
      userEmail: req.user?.email || 'admin',
      action: 'PROJECT_IMAGE_UPLOADED',
      category: 'ADMIN_ACTION',
      ipAddress: req.ip || 'unknown',
      userAgent: req.headers['user-agent'] || 'unknown',
      status: 'SUCCESS',
      details: {
        filename: req.file.filename,
        originalName: req.file.originalname,
        sizeBytes: req.file.size,
        imageUrl,
      },
    }).catch((e) => console.error('AuditLog error:', e.message));

    return res.status(201).json({
      success: true,
      message: 'Image uploaded successfully.',
      imageUrl,
      fileInfo: {
        filename: req.file.filename,
        size: req.file.size,
        mimetype: req.file.mimetype,
      },
    });
  } catch (error) {
    next(error);
  }
};
