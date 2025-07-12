import mongoose from "mongoose";

const ThreadSchema = new mongoose.Schema({

    img_url: {
        type: String,
        required:true
    },
    board: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        default: ''
    },
    text: {
        type: String,
        required: true
    },
    reply_count: {
        type: Number,
        default: 0
    },
    last_bump: {
        type: Date,
        default: Date.now,
        index: true
    },
    sticky: {
        type: Boolean,
        default: false
    },

}, { timestamps: true })

export default mongoose.model("Thread", ThreadSchema)