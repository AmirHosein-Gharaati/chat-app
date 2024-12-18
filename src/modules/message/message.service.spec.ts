import { TestingModule, Test } from "@nestjs/testing";
import { MessageService } from "./message.service";
import { RoomService } from "../room/room.service";
import { MessageRepository } from "./repo/message.repository";
import { Message } from "./message.entity";

describe('MessageService', () => {
  let service: MessageService;
  let messageRepository: MessageRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MessageService,
        {
          provide: RoomService,
          useValue: {
            participantExists: jest.fn().mockResolvedValue(true),
          }
        },
        {
          provide: MessageRepository,
          useValue: {
            save: jest.fn().mockImplementation((message: Message) => {
              message.id = '0';
              return Promise.resolve(message);
            }),
            findAll: jest.fn().mockResolvedValue([]),
          }
        }
      ],
    }).compile();

    service = module.get(MessageService);
    messageRepository = module.get(MessageRepository);
  });

  it('should create a message', async () => {
    const text = 'This is a test message';
    const userId = '1';
    const roomId = '1';

    const message = await service.create(text, userId, roomId);

    expect(message).toBeDefined();
    expect(message.text).toEqual(text);
    expect(message.id).toBeDefined();
  });
});
