const api_url = process.env.NEXT_PUBLIC_BACKEND_URL

const FetchThreads = async (board: string) => {
    try {
        const response = await fetch(`${api_url}/board/${board}`)
        if (!response.ok) throw new Error("Failed to fetch threads");
        const data = await response.json();
        return data;

    } catch (error) {
        console.log(error)
    }

}

export default FetchThreads