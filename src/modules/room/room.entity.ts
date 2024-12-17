import { Message } from '../chat/message.entity';

export class Room {
  id: string;
  name: string;
  participants: string[];
  messages: Message[];
}
