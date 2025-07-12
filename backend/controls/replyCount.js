import Thread from "../models/thread.schema.js"

const replyCountUpdate = async (req,res) => {
    const replycount = req.body.reply_count
    const threadId = req.body._id
    const NoComments =0
}