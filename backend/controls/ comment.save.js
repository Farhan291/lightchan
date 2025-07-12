
import Comment from "../models/comment.schema.js";
import cloudinary from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';

cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});


const storage = new CloudinaryStorage({
    cloudinary: cloudinary.v2,
    params: {
        folder: 'comment_img', 
        allowed_formats: ['jpg', 'jpeg', 'png', 'gif'],
    },
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024
    }
});

export const CommentImage = (req, res, next) => {
    console.log('CommentImage middleware started');
    
    upload.single('file')(req, res, (err) => {
        if (err) {
            console.error('Upload error:', err);
            if (err instanceof multer.MulterError) {
                if (err.code === 'LIMIT_FILE_SIZE') {
                    return res.status(413).json({ error: "File size exceeds 5MB limit" });
                }
                return res.status(400).json({ error: "File upload error: " + err.message });
            }
            return res.status(500).json({ error: "Server error during upload: " + err.message });
        }
        
        console.log('Upload successful, file object:', req.file);
        next();
    });
};

const commentSave = async (req, res) => {
    try {
        console.log('=== COMMENT SAVE STARTED ===');
        console.log('Request body:', req.body);
        console.log('Request file:', req.file);
        
        const { thread_id, comment ,replyto_id} = req.body;
        
        if (!thread_id || !comment) {
            console.log('Missing required fields');
            return res.status(400).json({ 
                error: "Missing required fields: thread_id and comment are required" 
            });
        }
        
        
        const newComment = new Comment({
            text: comment,
            thread_id,
            reply_to:replyto_id|| null 
        });
        
        if (req.file) {
            console.log('File details:', {
                path: req.file.path,
                filename: req.file.filename,
                size: req.file.size
            });
            newComment.img_url = req.file.path;
        }
        
        console.log('About to save comment:', newComment);
        const savedComment = await newComment.save();
        console.log('Comment saved successfully:', savedComment._id);
        
        res.status(201).json(savedComment);
    } catch (error) {
        console.error('Save error details:', error);
        res.status(500).json({ 
            error: "Failed to save comment: " + error.message 
        });
    }
};

export default commentSave;