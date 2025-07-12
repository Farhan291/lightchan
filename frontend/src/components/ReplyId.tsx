"use client"

import { useEffect, useState } from "react"

interface ReplyLinkProps {
  reply_to: string | undefined
}

export default function ReplyLink({ reply_to }: ReplyLinkProps) {
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    if (!reply_to || !isHovered) return

    const targetComment = document.getElementById(`comment-${reply_to}`)
    if (targetComment) {
      targetComment.classList.add('bg-yellow-100')
      return () => targetComment.classList.remove('bg-yellow-100')
    }
  }, [isHovered, reply_to])

  if (!reply_to) return null

  return (
    <a
      href={`#comment-${reply_to}`}
      className="text-[#DD0000] underline hover:text-[#AA0000]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {`>>${reply_to}`}
    </a>
  )
}