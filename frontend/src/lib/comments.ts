import { CommentsResponse, COMMMENT } from "@/types/type.comment"

const FetchComments = async (id: string): Promise<CommentsResponse> => {
    try {
        const resp = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/comments/${id}`)
        const data = await resp.json()
        return (data)
    } catch (error) {
        console.log(error)
        throw error
    }

}
export default FetchComments