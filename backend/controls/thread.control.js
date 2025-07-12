import mongoose from "mongoose"
import Thread from "../models/thread.schema.js"
const ThreadFetch = async (req, res) => {
    try {
        const { id } = req.params
        const thread = await Thread.findById(id)
        if (!thread) {
            return res.status(404).json({ success: false, error: 'Thread not found' });
        }
         res.status(200).json({ success: true, data: thread });
    } catch(error) {
        console.log(error)
    }
}

export default ThreadFetch