export interface Message {
  id?: number;
  sender_id: number;
  receiver_id: number;
  content: string;
  TimeForMessage: string;
  from?: 'me' | 'owner';
  User_photo?: string;
}
