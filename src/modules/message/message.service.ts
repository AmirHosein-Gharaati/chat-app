import { Injectable } from '@nestjs/common';
import { Message } from './message.entity';
import { RoomService } from '../room/room.service';

@Injectable()
export class MessageService {
  messages: Message[];
  sequenceNumber: number = 0;

  constructor(private readonly roomService: RoomService) {}

  create(text: string, userId: string, roomId: string) {
    const userExistsInRoom = this.roomService.participantExists(roomId, userId);
    if (!userExistsInRoom) {
      throw Error(
        `user does not exist with roomId=${roomId}, userId=${userId}`,
      );
    }
    const message = this.createMessage(text, userId, roomId);
    this.messages.push(message);

    return message;
  }

  private createMessage(text: string, userId: string, roomId: string) {
    const id = this.sequenceNumber.toString();
    this.sequenceNumber++;
    return new Message(id, text, userId, roomId);
  }
}
