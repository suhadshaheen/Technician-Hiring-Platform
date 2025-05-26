export interface Message {
  id?: number;
  sender_id: number;
  receiver_id: number;
  content: string;
  TimeForMessage: string;
  from?: 'me' | 'owner'; // لتحديد مصدر الرسالة
  User_photo?: string;   // الصورة الرمزية
}
