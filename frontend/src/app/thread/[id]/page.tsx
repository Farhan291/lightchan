
import FetchComments from "@/lib/comments";
import FetchThread from "@/lib/singleThread";


import Image from "next/image";
import Link from "next/link";
import { CommentsResponse, COMMMENT } from "@/types/type.comment";
import { ChevronRight } from "lucide-react";
import NewCommentToggle from "@/components/newCommentToggle";
import IdReplyToggle from "@/components/idReplyToggle";
import ReplyLink from "@/components/ReplyId";

const validBoards = {
  "a": "anime",
  "c": "anime/cute",
  "m": "math",
  "p": "photography",
  "lit": "literature",
  "mu": "music",
  "s": "science",
  "b": "random",
  "t": "technology",
  "sp": "sports",
  "aw": "anime/wallpapers",
  "cos": "cosplay",
  "w": "anime/wallpapers",
  "r": "rant"
};


export default async function ThreadView({ params }: { params: { id: string } }) {
    try {
        const { id } = await params

        const thread = await FetchThread(id)
        const response: CommentsResponse = await FetchComments(id)

        const comments = response.success ? response.data : [];




        return (
            <div className="bg-[#EEF2FF]" > 
                <h1 className="text-[40px] text-[#AF0A0F] font-bold flex justify-center items-center mb-6">/{thread.board}/ -{validBoards[thread.board as keyof typeof validBoards]}</h1>
                <NewCommentToggle/>
                <Link href={`http://localhost:3000/${thread.board}`} className="hover:text-[#DD0000]">[Return]</Link>
                {thread?.img_url ? (
                    <Image
                        src={thread.img_url}
                        alt={thread.subject || "Thread image"}
                        height={140}
                        width={250}
                        className="object-cover"
                    />
                ) : null}
                <div>
                    {thread.text}
                </div>
                
                <div className="bg-[#D6DAF0] ">
                    {Array.isArray(comments) ? (
                        comments.map((comment) => (
                            <div key={comment._id} id={`comment-${comment._id}`} className="border-b border-gray-200 py-4">
                                <div className="flex gap-0.5"><ChevronRight /> <p>{new Date(comment.createdAt).toLocaleString()}</p>  <IdReplyToggle  thread_id ={comment._id}_id={comment._id}/> </div>
                                <ReplyLink reply_to={comment.reply_to} />
                                <div className="mb-2">
                                    {comment.text} 
                                </div>
                                {comment.img_url &&
                                <Image src={comment.img_url } alt={"img"}
                                    height={140}
                                    width={250}
                                    className="object-cover"/>}
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500">No comments yet</p>
                    )}
                </div>
            </div>
        )
    } catch (error) {
        console.log(error)
    }



}