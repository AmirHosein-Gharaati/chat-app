import { Injectable } from '@nestjs/common';
import { Room } from './room.entity';

@Injectable()
export class RoomService {
  rooms: Room[] = [];

  sequenceNumber: number = 0;

  constructor() {}

  create(name: string) {
    const id = this.sequenceNumber.toString();
    this.sequenceNumber++;
    const room = new Room(id, name);

    this.rooms.push(room);

    return room;
  }

  addParticipant(roomId: string, userId: string) {
    const room = this.rooms.filter((room) => room.id === roomId);
    if (room.length === 0) {
      throw Error(`roomId ${roomId} does not exist`);
    }

    room[0].participants.push(userId);
  }

  participantExists(roomId: string, userId: string) {
    for (let i = 0; i < this.rooms.length; i++) {
      const room = this.rooms[i];

      if (room.id === roomId) {
        const userExists =
          room.participants.findIndex((pId) => pId === userId) != -1;
        return userExists;
      }
    }

    throw Error(`room does not exist with id=${roomId}`);
  }
}
