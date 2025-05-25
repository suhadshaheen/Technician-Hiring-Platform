// message.ts
export interface Message {
  id?: number;
  sender_id: number;
  receiver_id: number;
  content: string;
  TimeForMessage: string;
  firstname?: 'me' | 'owner'; // Optional, to indicate message origin
  User_photo?: string; // Optional, to include avatar for the message
}
