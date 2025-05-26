import { User } from "./User";

export interface Message {
  id: number;
  sender_id: number;
  receiver_id: number;
  content: string;
  TimeForMessage: string;

  sender?: User;
  receiver?: User;
}

export interface MessageWithMeta extends Message {
  from: 'me' | 'owner';
  avatar: string;
}
