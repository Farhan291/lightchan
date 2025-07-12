import Thread from "../models/thread.schema.js";
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from "multer";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});



// Set up Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'thread_img',
    allowed_formats: ['jpg', 'jpeg', 'png', 'gif'],
  },
});

// Initialize Multer with the storage
const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 
  }
});

// Middleware for single file upload 
export const uploadThreadImage = upload.single('file');

// Thread save controller
export const ThreadSave = async (req, res) => {
  try {
    
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

   
    const { comment, subject, board } = req.body;
    if (!comment || !board) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Create new thread with Cloudinary URL
    const newThread = new Thread({
      img_url: req.file.path,
      board,
      subject: subject || '',
      text: comment,
    });

    await newThread.save();

    return res.status(201).json({
      success: true,
      thread: newThread,
    });

  } catch (error) {
    console.error("Error saving thread:", error);
    return res.status(500).json({ 
      error: "Failed to save thread",
    });
  }
};