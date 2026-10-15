export const sanitizeString = (str) => {
  if (typeof str !== 'string') return '';
  return str.trim().replace(/[<>]/g, '');
};

export const validateLoginInput = (req, res, next) => {
  const { email, password } = req.body || {};

  if (!email || typeof email !== 'string' || !email.trim()) {
    return res.status(400).json({
      success: false,
      message: 'Please provide a valid email address.',
    });
  }

  const emailRegex = /^\S+@\S+\.\S+$/;
  if (!emailRegex.test(email.trim())) {
    return res.status(400).json({
      success: false,
      message: 'Please provide a valid email address format.',
    });
  }

  if (!password || typeof password !== 'string' || password.length < 8) {
    return res.status(400).json({
      success: false,
      message: 'Password must be at least 8 characters long.',
    });
  }

  req.body.email = email.trim().toLowerCase();
  next();
};

export const validateEnquiryInput = (req, res, next) => {
  const { name, email, phone, message, interest } = req.body || {};

  if (!name || typeof name !== 'string' || name.trim().length < 2) {
    return res.status(400).json({
      success: false,
      message: 'Name is required and must be at least 2 characters.',
    });
  }

  const emailRegex = /^\S+@\S+\.\S+$/;
  if (!email || !emailRegex.test(String(email).trim())) {
    return res.status(400).json({
      success: false,
      message: 'Please provide a valid email address.',
    });
  }

  if (!phone || typeof phone !== 'string' || phone.trim().length < 7) {
    return res.status(400).json({
      success: false,
      message: 'Please provide a valid contact phone number.',
    });
  }

  if (!message || typeof message !== 'string' || message.trim().length < 10) {
    return res.status(400).json({
      success: false,
      message: 'Message must be at least 10 characters describing your inquiry.',
    });
  }

  req.body.name = sanitizeString(name);
  req.body.email = email.trim().toLowerCase();
  req.body.phone = sanitizeString(phone);
  req.body.message = sanitizeString(message);
  req.body.interest = sanitizeString(interest || 'general-enquiry');

  next();
};
