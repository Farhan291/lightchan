"use client"

import { useState } from "react"
import ThreadForum from "./newThread-forum"
import NewComment from "./newComment.forum"

interface idprop{
    thread_id:string,
    _id:string
}

export default function IdReplyToggle({thread_id,_id}: idprop){
    const [toggle,settoggle] = useState(false)
    return (
        <div>
        <div className=" cursor-pointer hover:text-[#DD0000]" onClick={()=>settoggle(!toggle)}>
            {`NO. ${_id}`}
        </div>
        {toggle && <NewComment _id={_id}/>}
        </div>

    )
}