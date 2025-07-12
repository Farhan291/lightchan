// components/ui/thread-preview.tsx
import Image from "next/image";
import Link from "next/link";
import { Thread } from "@/types/thread";

interface ThreadPreviewProps {
    thread: Thread;
}

export default function ThreadPreview({ thread }: ThreadPreviewProps) {
    return (
        <div className="w-[180px] flex flex-col items-center text-cente ">
             {thread.img_url && (
        <Link href={`/thread/${thread._id}`} className="block w-[150px] relative">
          <Image
            src={thread.img_url}
            alt={thread.subject || "Thread image"}
            width={150}
            height={0} 
            className="w-full h-auto object-contain" 
            style={{ height: 'auto' }}
                    />
                </Link>)}
            <div className="w-[180px] flex flex-col items-center text-center">
                <p className="text-[12px]">R: {thread.reply_count}</p>
                <h3 className="font-bold text-[13px] break-words">{thread.subject || "No subject"} :</h3>
                <p className="text-black text-[13px] break-words">{thread.text}</p>

            </div>
        </div>
    );
}