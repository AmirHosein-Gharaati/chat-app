import { Message } from '../message.entity';

export abstract class MessageRepository {
  abstract save(message: Message): Promise<Message>;
  abstract findAll(): Promise<Message[]>;
  abstract findByRoomId(roomId: string): Promise<Message[]>;
}
