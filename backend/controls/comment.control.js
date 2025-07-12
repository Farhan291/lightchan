import Comment from "../models/comment.schema.js"


const CommentFetch = async (req, res) => {
    try {
        const { thread_id } = req.params;
        
        // .lean() to get plain JavaScript objects
        const comments = await Comment.find({ thread_id })
            .sort({ createdAt: -1 })
            .lean()
            .exec();
            
        res.status(200).json({ 
            success: true, 
            data: comments 
        });
    } catch(error) {
        res.status(400).json({ 
            success: false, 
            error: error.message 
        });
    }
}

export default CommentFetch;