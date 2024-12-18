import { Test } from '@nestjs/testing';
import { RoomService } from './room.service';
import { InMemoryRoomRepository } from './repo/in-memory/room.repository.impl';
import { RoomRepository } from './repo/room.repository';

describe('RoomService', () => {
  let roomService: RoomService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [RoomService, {
        provide: RoomRepository,
        useClass: InMemoryRoomRepository,
      }],
    }).compile();

    roomService = moduleRef.get(RoomService);
  });

  it('should add participant to a room', async () => {
    const userId = '1';
    const room = await roomService.create('Test room');

    const updatedRoom = await roomService.addParticipant(room.id, userId);

    expect(updatedRoom.participants.length).toBe(1);
    expect(updatedRoom.participants[0]).toBe(userId);
  });

  it('should raise an error when giving a room id which does not exist', () => {
    const userId = '1';
    const roomId = 'test-room-id';

    expect(() => roomService.addParticipant(roomId, userId)).rejects.toThrow(
      `room does not exist with id=${roomId}`,
    );
  });
});
