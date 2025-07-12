import ThreadPreview from "@/components/thread-preview";
import FetchThreads from "@/lib/api";
import { notFound } from "next/navigation";
import { Thread } from "@/types/thread";
import Link from "next/link";

import NewThreadToggle from "@/components/newThreadToggle";

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

export default async function BoardPage({ params }: { params: { board: string } }) {
  const { board } = params;

  if (!(board in validBoards)) {
    notFound();
  }
  try {
    const response = await FetchThreads(board);
    const threads: Thread[] = response.data || [];

    return (

      <div className="min-h-screen bg-[#EEF2FF]  border-4 border-black flex flex-col gap-8 px-4 py-6">
        <div className="">
          {Object.keys(validBoards).map((b) => (
            <Link key={b} href={`/${b}`} className="mr-1  text-blue-600">
              /{b}/
            </Link>
          ))}
        </div>

        <h1 className="text-[40px] text-[#AF0A0F] font-bold flex justify-center items-center mb-6">/{board}/ {validBoards[board as keyof typeof validBoards]}</h1>
      
        <NewThreadToggle/>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 justify-center">
          {threads.map((thread) => (
            <ThreadPreview key={thread._id} thread={thread} />
          ))}
        </div>
       
      </div>
    );
  } catch (error) {
    console.error("Error loading threads:", error);
    return (
      <div className="min-h-[calc(100vh-4rem)] bg-[#EEF2FF]">
        <div className="container mx-auto p-4 text-center">
          <h2 className="text-xl font-bold text-red-600">Error Loading Threads</h2>
          <p className="mt-2">Failed to fetch threads. Please try again later.</p>
        </div>
      </div>
    );
  }
}