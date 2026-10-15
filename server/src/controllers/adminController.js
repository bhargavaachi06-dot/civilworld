import User from '../models/User.js';
import AuditLog from '../models/AuditLog.js';
import Enquiry from '../models/Enquiry.js';
import { isDbConnected } from '../config/db.js';

export const getDashboardOverview = async (req, res, next) => {
  try {
    const dbConnected = isDbConnected();

    let enquiriesCount = 0;
    let recentEnquiries = [];
    let auditLogsCount = 0;
    let recentAuditLogs = [];
    let adminUsersCount = 0;

    if (dbConnected) {
      enquiriesCount = await Enquiry.countDocuments();
      recentEnquiries = await Enquiry.find().sort({ createdAt: -1 }).limit(5);
      auditLogsCount = await AuditLog.countDocuments();
      recentAuditLogs = await AuditLog.find().sort({ createdAt: -1 }).limit(8);
      adminUsersCount = await User.countDocuments();
    }

    return res.status(200).json({
      success: true,
      data: {
        databaseConnected: dbConnected,
        serverTime: new Date().toISOString(),
        uptimeSeconds: Math.floor(process.uptime()),
        stats: {
          totalEnquiries: enquiriesCount,
          totalAuditEvents: auditLogsCount,
          totalAdmins: adminUsersCount,
          constructionModulesCount: 7,
          trainingProgramsCount: 3,
        },
        recentEnquiries,
        recentAuditLogs,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getAuditLogs = async (req, res, next) => {
  try {
    if (!isDbConnected()) {
      return res.status(200).json({
        success: true,
        data: [],
        message: 'Database offline — audit logs cannot be retrieved.',
      });
    }

    const page = parseInt(req.query.page || '1', 10);
    const limit = parseInt(req.query.limit || '20', 10);
    const skip = (page - 1) * limit;

    const [logs, total] = await Promise.all([
      AuditLog.find().sort({ createdAt: -1 }).skip(skip).limit(limit),
      AuditLog.countDocuments(),
    ]);

    return res.status(200).json({
      success: true,
      data: logs,
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

export const getEnquiries = async (req, res, next) => {
  try {
    if (!isDbConnected()) {
      return res.status(200).json({
        success: true,
        data: [],
        message: 'Database offline — enquiries cannot be retrieved.',
      });
    }

    const page = parseInt(req.query.page || '1', 10);
    const limit = parseInt(req.query.limit || '20', 10);
    const skip = (page - 1) * limit;

    const [enquiries, total] = await Promise.all([
      Enquiry.find().sort({ createdAt: -1 }).skip(skip).limit(limit),
      Enquiry.countDocuments(),
    ]);

    return res.status(200).json({
      success: true,
      data: enquiries,
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

export const updateEnquiryStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['new', 'contacted', 'in-progress', 'closed'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status value.',
      });
    }

    const enquiry = await Enquiry.findByIdAndUpdate(
      id,
      { $set: { status } },
      { new: true }
    );

    if (!enquiry) {
      return res.status(404).json({
        success: false,
        message: 'Enquiry record not found.',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Enquiry status updated successfully.',
      data: enquiry,
    });
  } catch (error) {
    next(error);
  }
};
