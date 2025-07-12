"use client"
import axios, { Axios } from "axios"
import { useParams } from "next/navigation"
import { useRef, useState } from "react"
import { useForm } from "react-hook-form"

type ThreadForumData = {

  subject: string,
  comment: string,
  board: string,
  file: FileList
}



export default function ThreadForum() {

  const { register, handleSubmit, formState: { errors }, reset,watch } = useForm<ThreadForumData>()
  const { board } = useParams()

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const { ref, ...rest } = register('file', { required: "File is required" })


  const onSubmit = async (data: ThreadForumData) => {
    setIsSubmitting(true)
    setSubmitError("")
    setSubmitSuccess(false)

    try {
      const formData = new FormData();

      formData.append('subject', data.subject);
      formData.append('comment', data.comment);
      formData.append('board', board as string)
      formData.append('file', data.file[0]);
      const resp = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/post/thread`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
        

      }
      
    ); window.location.reload();  
      setSubmitSuccess(true)
      reset()
    } catch (error) {
      setSubmitError("submission failed")
    } finally {
      setIsSubmitting(false) 
    }
  }
    const fileName = watch("file")?.[0]?.name || "No file selected."



  return (
    <div className= "flex flex-col justify-center items-center">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-0.5 w-full max-w-md ">
        {/* subject Input */}
        <div className="flex ">
          <div className="bg-[#98E] border border-black w-[92px] h-[23px] font-semibold text-[13px] pl-1 p-0.5"> Subject</div>
          <input className="w-[254px] h-[23px] bg-white border border-[#AAA] "
            {...register("subject", { required: "subject is required" })}
            />
            <button type="submit" disabled={isSubmitting} className=" bg-white border h-[23px] ml-1 p-0.5 text-[12px] border-[#AAA] hover:bg-[#AAA] ">
          {isSubmitting ? "Submitting..." : "Post"}
        </button>
        </div>
        {errors.subject && <p className="error">{errors.subject.message}</p>}

        {/* Comment Textarea */}
        <div className="flex">
          <div className="bg-[#98E] border border-black w-[92px] h-[68px] font-semibold text-[13px] flex pl-1 items-center p-0.5"> Comment</div>
          <textarea className="w-[302px] h-[68px] border-[#AAA] border bg-white "
            {...register("comment", { required: "Comment is required" })}

          />
        </div>
        {errors.comment && <p className="error">{errors.comment.message}</p>}

        {/* File Upload */}
        <div className="flex">
          <div className="bg-[#98E] border border-black w-[92px] h-[23px] font-semibold text-[13px] pl-1 p-0.5">File</div>
          <div className="flex items-center border border-[#AAA] bg-white pl-2 pr-2 w-[302px] h-[23px]">
            <span className="text-gray-500 text-sm mr-2">{fileName}</span>
            <button 
              type="button"
              className="text-sm underline "
              onClick={() => fileInputRef.current?.click()}
            >
              Browse...
            </button>
            <input
              type="file"
              className="hidden"
              accept=".pdf,.jpg,.png"
              {...rest}
              ref={(e) => {
                ref(e)
                fileInputRef.current = e
              }}
            />
          </div>
        </div>
        {errors.file && <p className="error">{errors.file.message}</p>}

       
        {/* Success/Error Messages */}
        {submitSuccess && <p className="success">Submitted successfully!</p>}
        {submitError && <p className="error">{submitError}</p>}
      </form>
    </div>
  )
}