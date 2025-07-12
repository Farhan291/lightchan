import Thread from "../models/thread.schema.js"
const ThreadsFetch = async (req, res) => {
    try {
        const { board } = req.params
        const threads = await Thread.find({ board }).sort({ sticky: -1, last_bump: -1 }).limit(50)
        res.status(200).json({ success: true, data: threads });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
}

export default ThreadsFetch