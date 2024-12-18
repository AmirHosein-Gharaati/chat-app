import { Test, TestingModule } from '@nestjs/testing';
import { ChatGateway } from './chat.gateway';
import { RoomService } from '../room/room.service';
import { MessageService } from '../message/message.service';
import { io, Socket } from 'socket.io-client';
import { INestApplication } from '@nestjs/common';
import { InMemoryMessageRepository } from '../message/repo/in-memory/message.repository.impl';
import { MessageRepository } from '../message/repo/message.repository';
import { InMemoryRoomRepository } from '../room/repo/in-memory/room.repository.impl';
import { RoomRepository } from '../room/repo/room.repository';

describe('ChatGateway', () => {
    let clients: Socket[];
    let app: INestApplication;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ChatGateway,
                RoomService,
                MessageService,
                {
                    provide: MessageRepository,
                    useClass: InMemoryMessageRepository,
                },
                {
                    provide: RoomRepository,
                    useClass: InMemoryRoomRepository,
                }
            ],
        }).compile();

        app = module.createNestApplication();
        await app.listen(3000);

        // Create 4 clients
        clients = Array(4).fill(null).map(() =>
            io('ws://localhost:3000', {
                transports: ['websocket'],
                autoConnect: true,
            })
        );

        // Wait for all clients to connect
        await Promise.all(clients.map(client =>
            new Promise<void>((resolve) => client.on('connect', () => resolve()))
        ));
    });

    afterAll(async () => {
        await Promise.all(clients.map(client => client.disconnect()));
        await app.close();
    });

    it('should handle room creation, joining, messaging, and message retrieval correctly', (done) => {
        const room1Id = '0';
        const room2Id = '1';
        const messageText = 'Hello, room1!';

        (async () => {
            try {
                // Client1 creates and joins room1
                clients[0].emit('createRoom', { roomName: 'Room 1' });
                await new Promise(resolve => setTimeout(resolve, 50));
                clients[0].emit('joinRoom', { roomId: room1Id, userId: 'user1' });
                await new Promise(resolve => setTimeout(resolve, 50));

                // Client2 joins room1
                clients[1].emit('joinRoom', { roomId: room1Id, userId: 'user2' });
                await new Promise(resolve => setTimeout(resolve, 50));

                // Client3 creates and joins room2
                clients[2].emit('createRoom', { roomName: 'Room 2' });
                await new Promise(resolve => setTimeout(resolve, 50));
                clients[2].emit('joinRoom', { roomId: room2Id, userId: 'user3' });
                await new Promise(resolve => setTimeout(resolve, 50));

                // Setup message listener for client1
                clients[0].on('newMessage', (message) => {
                    expect(message.text).toBe(messageText);
                    expect(message.room).toBe(room1Id);
                });

                // Setup message listener for client3 (should not receive)
                clients[2].on('newMessage', () => {
                    fail('Client 3 should not receive the message');
                });

                await new Promise(resolve => setTimeout(resolve, 50));

                // Client2 sends a message to room1
                clients[1].emit('sendMessage', {
                    text: messageText,
                    userId: 'user2',
                    roomId: room1Id
                });
                await new Promise(resolve => setTimeout(resolve, 50));

                // Client4 joins room1 and retrieves messages
                clients[3].emit('joinRoom', { roomId: room1Id, userId: 'user4' });
                await new Promise(resolve => setTimeout(resolve, 50));

                clients[3].emit('retrieveMessages', { roomId: room1Id }, (response) => {
                    expect(response.success).toBe(true);
                    expect(response.messages.length).toBeGreaterThan(0);
                    expect(response.messages[0].text).toBe(messageText);
                });
                await new Promise(resolve => setTimeout(resolve, 50));

                done();

            } catch (error) {
                done(error);
            }
        })();
    });
});