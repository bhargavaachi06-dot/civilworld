import multer from 'multer';
import path from 'path';
import fs from 'fs';
import crypto from 'crypto';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Target upload directory for project images
export const uploadDir = path.join(__dirname, '../../uploads/projects');

// Ensure directory exists synchronously on initialization
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Disk storage configuration with unique random hex naming
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const randomName = `cw-project-${Date.now()}-${crypto.randomBytes(6).toString('hex')}${ext}`;
    cb(null, randomName);
  },
});

// Initial multer filter checking declared MIME types and extensions
const fileFilter = (req, file, cb) => {
  const allowedMimes = ['image/jpeg', 'image/pjpeg', 'image/png', 'image/webp'];
  const allowedExts = ['.jpg', '.jpeg', '.png', '.webp'];

  const ext = path.extname(file.originalname).toLowerCase();

  if (allowedMimes.includes(file.mimetype) && allowedExts.includes(ext)) {
    cb(null, true);
  } else {
    cb(
      new Error(
        'Invalid file type. Only JPEG, PNG, and WebP image files under 5MB are permitted.'
      ),
      false
    );
  }
};

export const projectImageUpload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB max file size
    files: 1, // Single image per upload request
  },
  fileFilter,
});

/**
 * Detect image format from binary magic bytes
 * - JPEG: FF D8 FF
 * - PNG: 89 50 4E 47 0D 0A 1A 0A
 * - WebP: RIFF (bytes 0-3) and WEBP (bytes 8-11)
 *
 * @param {Buffer} buffer - Buffer containing at least the first 12-16 bytes of the file
 * @returns {'jpeg' | 'png' | 'webp' | null}
 */
export const detectImageSignature = (buffer) => {
  if (!buffer || buffer.length < 3) return null;

  // JPEG: FF D8 FF
  if (buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff) {
    return 'jpeg';
  }

  // PNG: 89 50 4E 47 0D 0A 1A 0A
  if (
    buffer.length >= 8 &&
    buffer[0] === 0x89 &&
    buffer[1] === 0x50 &&
    buffer[2] === 0x4e &&
    buffer[3] === 0x47 &&
    buffer[4] === 0x0d &&
    buffer[5] === 0x0a &&
    buffer[6] === 0x1a &&
    buffer[7] === 0x0a
  ) {
    return 'png';
  }

  // WebP: RIFF (bytes 0-3) and WEBP (bytes 8-11)
  if (
    buffer.length >= 12 &&
    buffer[0] === 0x52 && // 'R'
    buffer[1] === 0x49 && // 'I'
    buffer[2] === 0x46 && // 'F'
    buffer[3] === 0x46 && // 'F'
    buffer[8] === 0x57 && // 'W'
    buffer[9] === 0x45 && // 'E'
    buffer[10] === 0x42 && // 'B'
    buffer[11] === 0x50 // 'P'
  ) {
    return 'webp';
  }

  return null;
};

/**
 * Read the first 16 bytes of a file on disk without loading the entire file into memory
 *
 * @param {string} filePath - Absolute path to file on disk
 * @returns {Promise<Buffer>}
 */
export const readMagicBytes = async (filePath) => {
  let fd;
  try {
    const buffer = Buffer.alloc(16);
    fd = await fs.promises.open(filePath, 'r');
    const { bytesRead } = await fd.read(buffer, 0, 16, 0);
    return buffer.subarray(0, bytesRead);
  } finally {
    if (fd) await fd.close();
  }
};

/**
 * Safely delete an unapproved or invalid file from disk
 *
 * @param {string} filePath - Path to file
 */
export const safeUnlink = async (filePath) => {
  if (!filePath) return;
  try {
    if (fs.existsSync(filePath)) {
      await fs.promises.unlink(filePath);
    }
  } catch (err) {
    console.error(`[Upload Security] Failed to delete invalid file at ${filePath}:`, err.message);
  }
};

/**
 * Complete middleware that handles single image upload and strictly validates
 * binary signatures, ensuring agreement between detected format, declared MIME type,
 * and file extension, cleaning up invalid files on failure.
 */
export const projectImageUploadMiddleware = (req, res, next) => {
  projectImageUpload.single('image')(req, res, async (err) => {
    if (err) {
      if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
          return res.status(400).json({
            success: false,
            message: 'File size exceeds the 5MB limit.',
          });
        }
        return res.status(400).json({
          success: false,
          message: `Upload error: ${err.message}`,
        });
      }
      return res.status(400).json({
        success: false,
        message: err.message || 'Invalid file upload request.',
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No image file uploaded or invalid file format.',
      });
    }

    const filePath = req.file.path;

    try {
      // 1. Read first 16 bytes directly from disk without loading full file
      const magicBytes = await readMagicBytes(filePath);

      // 2. Detect real binary file signature
      const detectedFormat = detectImageSignature(magicBytes);

      if (!detectedFormat) {
        await safeUnlink(filePath);
        return res.status(400).json({
          success: false,
          message: 'Invalid file content. The file signature does not match permitted image formats (JPEG, PNG, WebP).',
        });
      }

      // 3. Verify format agreement with declared MIME and extension
      const ext = path.extname(req.file.originalname).toLowerCase();
      const declaredMime = (req.file.mimetype || '').toLowerCase();

      const formatRules = {
        jpeg: {
          mimes: ['image/jpeg', 'image/pjpeg'],
          extensions: ['.jpg', '.jpeg'],
        },
        png: {
          mimes: ['image/png'],
          extensions: ['.png'],
        },
        webp: {
          mimes: ['image/webp'],
          extensions: ['.webp'],
        },
      };

      const rules = formatRules[detectedFormat];
      const mimeMatches = rules.mimes.includes(declaredMime);
      const extMatches = rules.extensions.includes(ext);

      if (!mimeMatches || !extMatches) {
        await safeUnlink(filePath);
        return res.status(400).json({
          success: false,
          message: `File format mismatch. Content is ${detectedFormat.toUpperCase()}, but declared extension "${ext}" or MIME type "${declaredMime}" disagrees.`,
        });
      }

      // Content signature and metadata match!
      next();
    } catch (validationErr) {
      await safeUnlink(filePath);
      return res.status(400).json({
        success: false,
        message: 'Failed to validate uploaded file signature.',
      });
    }
  });
};

export default projectImageUploadMiddleware;
