import { Injectable } from '@nestjs/common';
import { Message } from '../../message.entity';
import { MessageRepository } from '../message.repository';

@Injectable()
export class InMemoryMessageRepository extends MessageRepository {
  private messages: Message[] = [];
  private sequenceNumber: number = 0;

  async save(message: Message): Promise<Message> {
    if (!message.id) {
      message.id = this.sequenceNumber.toString();
      this.sequenceNumber++;
    }
    this.messages.push(message);
    return message;
  }

  async findAll(): Promise<Message[]> {
    return [...this.messages];
  }

  async findByRoomId(roomId: string): Promise<Message[]> {
    return this.messages.filter(message => message.room === roomId);
  }
}
