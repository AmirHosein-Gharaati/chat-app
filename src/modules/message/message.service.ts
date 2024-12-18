import { Injectable } from '@nestjs/common';
import { Message } from './message.entity';
import { RoomService } from '../room/room.service';
import { MessageRepository } from './repo/message.repository';

@Injectable()
export class MessageService {
  constructor(
    private readonly roomService: RoomService,
    private readonly messageRepository: MessageRepository,
  ) {}

  async create(text: string, userId: string, roomId: string) {
    const userExistsInRoom = await this.roomService.participantExists(roomId, userId);
    if (!userExistsInRoom) {
      throw Error(
        `user does not exist with roomId=${roomId}, userId=${userId}`,
      );
    }
    
    const message = new Message(text, userId, roomId);
    return await this.messageRepository.save(message);
  }
}
