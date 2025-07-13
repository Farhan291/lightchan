import express from "express"
import ThreadFetch from "../controls/thread.control.js";
import ThreadsFetch from "../controls/threads.control.js";
import CommentFetch from "../controls/comment.control.js";
import  { uploadThreadImage, ThreadSave } from "../controls/thread.save.js";
import commentSave, { CommentImage } from "../controls/ comment.save.js";
import adminverify from "../controls/admin.control.js";

const router = express.Router();


router.get('/thread/:id', ThreadFetch);
router.get('/board/:board', ThreadsFetch);
router.get('/comments/:thread_id', CommentFetch);

router.post('/post/thread',uploadThreadImage, ThreadSave)
router.post('/post/comment',CommentImage,commentSave)

router.delete('/admin/thread',adminverify)


export default router;