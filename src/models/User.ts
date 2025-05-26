import { Profile } from './Profile';
import { Role } from './Role';
import { Message } from './message';

export interface User {
  id: number;
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  role_id: number;
  phone?: string;
  city?: string;
  country?: string;


  profile?: Profile;
  role?: Role;
  sentMessages?: Message[];
  receivedMessages?: Message[];
}
