"use client"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form";
import { CommentForum } from "@/types/type.comment.forum";
import { useRef, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";

interface commentprop {
        _id?:string
    }


export default function NewComment({_id}:commentprop) {
    const { register, handleSubmit, formState: { errors }, reset, watch } = useForm<CommentForum>()
    const { id } = useParams()
     const router = useRouter()
    
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitError, setSubmitError] = useState("")
    const [submitSuccess, setSubmitSuccess] = useState(false)

    const fileInputRef = useRef<HTMLInputElement | null>(null)
    const { ref: fileRef, ...rest } = register('file')

    const onSubmit = async (data: CommentForum) => {
        setIsSubmitting(true)
        setSubmitSuccess(false)
        setSubmitError("")

        try {
           
            const formData = new FormData()
            formData.append('comment', data.comment)
            formData.append('thread_id', id as string)
            if(_id){
                formData.append('replyto_id',_id)
            }

            if (data.file && data.file.length > 0) {
                formData.append('file', data.file[0])
                }

            
            

            const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/post/comment`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                withCredentials: true,
            })

            
            if (response.status === 201) {
                setSubmitSuccess(true)
                reset()
                
                if (fileInputRef.current) {
                    fileInputRef.current.value = '';

                } window.location.reload()
            } else {
                throw new Error('Failed to post comment')
            }
        } catch (error) {
            console.error('Submission error:', error)
            setSubmitError(
                axios.isAxiosError(error) 
                    ? error.response?.data?.error || error.message 
                    : 'Submission failed'
            )
        } finally {
            setIsSubmitting(false)
        }
    }

    const fileName = watch('file')?.[0]?.name || "No file selected"
    

    return (
        <div className="p-2">
            <form 
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-2 max-w-md mx-auto"
            >
                {/* Comment Field */}
                <div className="flex items-start">
                    <label className="bg-[#98E] border border-black w-24 h-20 font-semibold text-xs flex items-center justify-center p-1">
                        Comment
                    </label>
                    <textarea 
                        className="w-72 h-20 border border-[#AAA] bg-white p-1 resize-none"
                        {...register("comment", { 
                            required: "Comment is required",
                            minLength: {
                                value: 3,
                                message: "Comment must be at least 3 characters"
                            }
                        })}
                    />
                </div>
                {errors.comment && (
                    <p className="text-red-500 text-xs ml-24">{errors.comment.message}</p>
                )}

                {/* File Upload */}
                <div className="flex items-center">
                    <label className="bg-[#98E] border border-black w-24 h-6 font-semibold text-xs flex items-center justify-center p-1">
                        File
                    </label>
                    <div className="flex items-center border border-[#AAA] bg-white px-2 h-6 flex-1">
                        <span className="text-gray-500 text-xs truncate mr-2 max-w-[180px]">
                            {fileName}
                        </span>
                        <button
                            type="button"
                            className="text-xs underline hover:text-blue-600"
                            onClick={() => fileInputRef.current?.click()}
                        >
                            Browse...
                        </button>
                        <input
                            type="file"
                            className="hidden"
                            accept=".jpg,.jpeg,.png,.gif"
                            {...rest}
                            ref={(e) => {
                                fileRef(e)
                                fileInputRef.current = e
                            }}
                        />
                    </div>
                </div>
                {errors.file && (
                    <p className="text-red-500 text-xs ml-24">{errors.file.message}</p>
                )}

                {/* Submit Button */}
                <div className="flex justify-end">
                    <button 
                        type="submit" 
                        disabled={isSubmitting}
                        className="bg-white border h-6 px-3 text-xs border-[#AAA] hover:bg-gray-100 disabled:opacity-50"
                    >
                        {isSubmitting ? "Submitting..." : "Post"}
                    </button>
                </div>

                
                {submitSuccess && (
                    <p className="text-green-500 text-xs text-center">
                        Comment posted successfully!
                    </p>
                )}
                {submitError && (
                    <p className="text-red-500 text-xs text-center">
                        {submitError}
                    </p>
                )}
            </form>
        </div>
    )
}