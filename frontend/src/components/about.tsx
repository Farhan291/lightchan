import Link from "next/link";

export default function About() {
  return (
    <div className="flex items-center justify-center min-h-screen flex-col px-2">
      
      <div className="bg-red-600 text-white font-bold p-2 w-full max-w-[750px] border border-black text-center">
        What is Lightchan
      </div>

      
      <div className="w-full max-w-[750px] h-auto text-[13px] border border-black p-3 mt-2 bg-white">
        Lightchan is a simple image-based bulletin board where anyone can post comments and share images.
        There are boards dedicated to a variety of topics, from Japanese animation and culture to videogames,
        music, and photography. Users do not need to register an account before participating in the community.
        Feel free to click on a board below that interests you and jump right in!
        <br /><br />
        Be sure to familiarize yourself with the Rules before posting, and read the{" "}
        <Link href="/FAQ" className="text-blue-600 underline">FAQ</Link> if you wish to learn more about how to use the site.
      </div>

      
      <div className="w-full max-w-[750px] border border-black mt-4 bg-[#fff7f3]">
        <div className="font-bold bg-[#f3ac88] text-[#800] pl-2 py-1">
          Boards
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-4 gap-y-2 text-[13px] p-3">
          
          <div>
            <div className="font-bold underline text-[#800] mb-1">Japanese Culture</div>
            <Link href="/a" className="block">Anime & Manga</Link>
            <Link href="/c" className="block">Anime/Cute</Link>
            <Link href="/aw" className="block">Anime/Wallpapers</Link>
            <Link href="/cos" className="block">Cosplay & EGL</Link>
          </div>
      
          <div>
            <div className="font-bold underline text-[#800] mb-1">Interests</div>
            <Link href="/t" className="block">Technology</Link>
            <Link href="/m" className="block">Math</Link>
            <Link href="/s" className="block">Science</Link>
            <Link href="/sp" className="block">Sports</Link>
          </div>

          <div>
            <div className="font-bold underline text-[#800] mb-1">Creative</div>
            <Link href="/p" className="block">Photography</Link>
            <Link href="/w" className="block">Wallpaper</Link>
            <Link href="/lit" className="block">Literature</Link>
            <Link href="/mu" className="block">Music</Link>
          </div>

          <div>
            <div className="font-bold underline text-[#800] mb-1">Other</div>
            <Link href="/b" className="block">Random</Link>
            <Link href="/r" className="block">Rant</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

