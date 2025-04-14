import { Message } from "./message";
export interface Chat {
  id: number;
  teamName: string;
  description: string;
  participants: string[];
  messages: Message[];
}
