import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Message } from './message.entity';
import { RoomService } from '../room/room.service';
import { MessageRepository } from './repo/message.repository';

@Injectable()
export class MessageService {
  private readonly logger = new Logger('MessageService');
  
  constructor(
    private readonly roomService: RoomService,
    private readonly messageRepository: MessageRepository,
  ) {}

  async create(text: string, userId: string, roomId: string) {
    const userExistsInRoom = await this.roomService.participantExists(roomId, userId);
    if (!userExistsInRoom) {
      this.logger.error(`user does not exist with roomId=${roomId}, userId=${userId}`);
      throw new NotFoundException(
        `user does not exist with roomId=${roomId}, userId=${userId}`,
      );
    }
    
    const message = new Message(text, userId, roomId);
    this.logger.log(`message created with id=${message.id}`);
    
    return await this.messageRepository.save(message);
  }

  async retrieveMessages(roomId: string) {
    const roomExists = await this.roomService.existsById(roomId);
    if (!roomExists) {
      this.logger.error(`room does not exist with id=${roomId}`);
      throw new NotFoundException(`room does not exist with id=${roomId}`);
    }

    return this.messageRepository.findByRoomId(roomId);
  }
}
