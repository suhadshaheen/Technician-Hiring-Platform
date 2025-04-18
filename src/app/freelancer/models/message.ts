export interface Message {
  from: 'me' | 'owner';
  text: string;
  avatar?: string;
  timestamp?: Date;
}
