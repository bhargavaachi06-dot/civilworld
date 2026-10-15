import mongoose from 'mongoose';

const enquirySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      maxlength: [100, 'Name cannot exceed 100 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address'],
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
      maxlength: [20, 'Phone cannot exceed 20 characters'],
    },
    interest: {
      type: String,
      enum: [
        'residential-construction',
        'commercial-construction',
        'turnkey-projects',
        'interior-design',
        'exterior-design',
        'estimation-boq',
        'academy-training',
        'practical-site-training',
        'documentation-training',
        'general-enquiry',
      ],
      default: 'general-enquiry',
    },
    message: {
      type: String,
      required: [true, 'Message content is required'],
      trim: true,
      maxlength: [2000, 'Message cannot exceed 2000 characters'],
    },
    status: {
      type: String,
      enum: ['new', 'contacted', 'in-progress', 'closed'],
      default: 'new',
    },
    ipAddress: {
      type: String,
      default: 'unknown',
    },
  },
  {
    timestamps: true,
  }
);

enquirySchema.index({ createdAt: -1 });

const Enquiry = mongoose.model('Enquiry', enquirySchema);
export default Enquiry;
