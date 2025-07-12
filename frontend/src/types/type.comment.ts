export type COMMMENT  = {
    _id:string
    thread_id:string,
    text:string,
    reply_to?:string,
    img_url?:string,
    createdAt:Date,
    updatedAt:Date
}

export type CommentsResponse = {
    success: boolean;
    data: COMMMENT[];
}
