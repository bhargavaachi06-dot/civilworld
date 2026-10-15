import Enquiry from '../models/Enquiry.js';
import { isDbConnected } from '../config/db.js';

export const submitEnquiry = async (req, res, next) => {
  try {
    const { name, email, phone, interest, message } = req.body;
    const ipAddress = req.ip || req.connection?.remoteAddress || 'unknown';

    if (!isDbConnected()) {
      return res.status(503).json({
        success: false,
        message: 'The enquiry submission service is temporarily offline. Please reach out via phone or email, or try again shortly.',
      });
    }

    const enquiry = await Enquiry.create({
      name,
      email,
      phone,
      interest,
      message,
      ipAddress,
    });

    return res.status(201).json({
      success: true,
      message: 'Thank you for reaching out to CivilWorld. Our engineering and admissions team will contact you shortly.',
      data: {
        referenceId: enquiry._id,
        createdAt: enquiry.createdAt,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getPublicStats = async (req, res) => {
  return res.status(200).json({
    success: true,
    data: {
      divisions: [
        {
          id: 'construction',
          name: 'Construction & Engineering',
          description: 'Turnkey residential, commercial, interior & exterior execution with professional BOQ.',
        },
        {
          id: 'academy',
          name: 'CivilWorld Training Academy',
          description: 'Practical site engineering, drawing interpretation, quantity surveying and documentation.',
        },
      ],
      features: [
        'Rigorous site safety and supervised training',
        'Transparent BOQ and daily progress reporting',
        'Real-world site drawing interpretation',
        'Dedicated verification for training certificates',
      ],
    },
  });
};
