import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({

    thread_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Thread', 
        required: true,
        index: true
    },
    text: {
        type: String,
        required: true
    },
    reply_to: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment', 
        default: null
    },
    img_url: {
        type: String,

    },

}, { timestamps: true })

export default mongoose.model("Comment", commentSchema)