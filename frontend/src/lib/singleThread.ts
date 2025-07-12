import { THREAD } from "@/types/type.Thread"

const FetchThread = async (id: string): Promise<THREAD> => {
    try {
        
        const resp = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/thread/${id}`)
        if (!resp.ok) throw new Error("Failed to fetch thread");
        const data = await resp.json()
        
        return (data.data)
    } catch (error) {
        console.log(error)
        throw error;
    }
}

export default FetchThread