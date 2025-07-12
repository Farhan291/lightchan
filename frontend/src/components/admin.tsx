"use client"
import { adminForm } from "@/types/type.admin.form"
import axios from "axios"
import { useState } from "react"
import { useForm } from "react-hook-form"

export default function Admin() {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<adminForm>()

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitError, setSubmitError] = useState("")
    const [submitSuccess, setSubmitSuccess] = useState(false)

    const onSubmit = async (data: adminForm) => {
        setIsSubmitting(true)
        setSubmitError("")
        setSubmitSuccess(false)

        try {
            const formdata = new FormData()
            formdata.append("key", data.key)
            formdata.append("thread_id", data.thread_id)

            const resp = await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/thread`, {
                data: { 
                    key: data.key,
                    thread_id: data.thread_id
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if (resp.status == 200) {
                setSubmitSuccess(true)
                reset()
            } else {
                setSubmitError("Failed to delete thread. Please try again.")
            }



        } catch (error) {
            console.log(error)
        } finally { setIsSubmitting(false) }
    }
    return (
        <div>
            
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>KEy</div>
                <input
                    id="key"
                    type="password"
                    {...register("key", { required: "Admin key is required" })}
                    className="w-full p-2 border rounded"
                />
                {errors.key && (
                    <p className="text-red-500 text-sm mt-1">{errors.key.message}</p>)}

                <label htmlFor="thread_id" className="block mb-1 font-medium">
                    Thread ID
                </label>
                <input
                    id="thread_id"
                    {...register("thread_id", { required: "Thread ID is required" })}
                    className="w-full p-2 border rounded"
                />
                {errors.thread_id && (
                    <p className="text-red-500 text-sm mt-1">{errors.thread_id.message}</p>
                )}

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-2 px-4 rounded text-white ${isSubmitting ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'}`}
                >
                    {isSubmitting ? 'Deleting...' : 'Delete Thread'}
                </button>

            </form>
        </div>
    )



}