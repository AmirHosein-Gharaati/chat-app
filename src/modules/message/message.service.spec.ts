import { TestingModule, Test } from "@nestjs/testing";
import { MessageService } from "./message.service";
import { RoomService } from "../room/room.service";


describe('MessageService', () => {
  let service: MessageService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MessageService, {
        provide: RoomService,
        useValue: {
            participantExists: jest.fn().mockReturnValue(Promise.resolve(true)),
        }
      }],
    }).compile();

    service = module.get(MessageService);
  });

  it('should create a message', async () => {
    const text = 'This is a test message';
    const userId = '1';
    const roomId = '1';

    const message = await service.create(text, userId, roomId);

    expect(message).toBeDefined();
    expect(message.text).toEqual(text);
  })
});
