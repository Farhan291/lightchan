"use client"
import { useState } from "react"
import ThreadForum from "./newThread-forum"

export default function NewThreadToggle(){
    
    const [toggle,settoggle] =useState(false)
    return(
         <div>
         <h2 className=" text-[30px] cursor-pointer text-[#DD0000] font-bold flex justify-center items-center mb-6" onClick={ () =>settoggle(!toggle)  } > [Start a New Thread]</h2>
         
         {toggle && <ThreadForum/>}
         </div>
    )
}