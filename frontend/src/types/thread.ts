export interface Thread {
  _id: string;
  subject?: string;
  text: string;
  img_url?: string;
  reply_count: number;
  createdAt:number;
}