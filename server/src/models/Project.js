import mongoose from 'mongoose';

const milestoneSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Milestone title is required'],
      trim: true,
      maxlength: [150, 'Milestone title cannot exceed 150 characters'],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, 'Milestone description cannot exceed 500 characters'],
      default: '',
    },
    date: {
      type: Date,
      default: null,
    },
    status: {
      type: String,
      enum: ['pending', 'in-progress', 'completed'],
      default: 'pending',
    },
  },
  { _id: true }
);

const galleryImageSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: [true, 'Image URL is required'],
      trim: true,
    },
    caption: {
      type: String,
      trim: true,
      maxlength: [200, 'Caption cannot exceed 200 characters'],
      default: '',
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  { _id: true }
);

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Project title is required'],
      trim: true,
      maxlength: [160, 'Project title cannot exceed 160 characters'],
    },
    slug: {
      type: String,
      required: [true, 'Slug is required'],
      unique: true,
      lowercase: true,
      trim: true,
      default: function () {
        if (this.title) {
          return this.title
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, '')
            .replace(/[\s_-]+/g, '-')
            .replace(/^-+|-+$/g, '');
        }
        return undefined;
      },
      match: [/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must be URL-safe (lowercase letters, numbers, hyphens)'],
    },
    category: {
      type: String,
      required: [true, 'Project category is required'],
      enum: ['residential', 'commercial', 'interiors', 'exteriors', 'turnkey'],
      index: true,
    },
    description: {
      type: String,
      required: [true, 'Public project description is required'],
      trim: true,
      maxlength: [3000, 'Description cannot exceed 3000 characters'],
    },
    objectives: {
      type: [String],
      default: [],
    },
    location: {
      type: String,
      required: [true, 'Project city/area location is required'],
      trim: true,
      maxlength: [100, 'Location must be city/area level only (max 100 characters)'],
    },
    status: {
      type: String,
      enum: ['planned', 'ongoing', 'completed', 'archived'],
      default: 'planned',
      index: true,
    },
    publicationStatus: {
      type: String,
      enum: ['draft', 'published'],
      default: 'draft',
      index: true,
    },
    coverImage: {
      type: String,
      trim: true,
      default: '',
    },
    gallery: {
      type: [galleryImageSchema],
      default: [],
    },
    milestones: {
      type: [milestoneSchema],
      default: [],
    },
    startDate: {
      type: Date,
      default: null,
    },
    completionDate: {
      type: Date,
      default: null,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// Slug auto-generation helper if not provided
projectSchema.pre('validate', function () {
  if (!this.slug && this.title) {
    this.slug = this.title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }
});

// Method for safe public serialization (hides internal admin IDs and draft state)
projectSchema.methods.toPublicJSON = function () {
  return {
    id: this._id,
    title: this.title,
    slug: this.slug,
    category: this.category,
    description: this.description,
    objectives: this.objectives,
    location: this.location,
    status: this.status,
    coverImage: this.coverImage,
    gallery: this.gallery.sort((a, b) => a.order - b.order),
    milestones: this.milestones.sort((a, b) => (a.date || 0) - (b.date || 0)),
    startDate: this.startDate,
    completionDate: this.completionDate,
    createdAt: this.createdAt,
  };
};

const Project = mongoose.model('Project', projectSchema);
export default Project;
