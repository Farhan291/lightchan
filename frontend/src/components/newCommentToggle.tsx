"use client"

import { useState } from "react"
import NewComment from "./newComment.forum"

export default function NewCommentToggle(){
    const [toggle,settoggle] =useState(false)
     return(
             <div>
             <h2 className=" text-[30px] cursor-pointer text-[#DD0000] font-bold flex justify-center items-center mb-6" onClick={ () =>settoggle(!toggle)  } > [Post a Reply]</h2>
             
             {toggle && <NewComment />}
             </div>
        )

}