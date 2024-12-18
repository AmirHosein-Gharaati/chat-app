import { WebSocketGateway, SubscribeMessage, MessageBody, ConnectedSocket, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { RoomService } from '../room/room.service';
import { MessageService } from '../message/message.service';
import { Logger } from '@nestjs/common';

@WebSocketGateway({
    cors: {
        origin: '*',
    },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()
    server: Server;
    private readonly logger = new Logger('ChatGateway');

    constructor(
        private readonly roomService: RoomService,
        private readonly messageService: MessageService,
    ) { }

    async handleConnection(client: Socket) {
        this.logger.log(`client connected with socketId=${client.id}`);
    }

    async handleDisconnect(client: Socket) {
        this.logger.log(`client disconnected with socketId=${client.id}`);
    }

    @SubscribeMessage('createRoom')
    async handleCreateRoom(
        @MessageBody() data: { roomName: string},
        @ConnectedSocket() client: Socket,
    ) {
        try {
            const room = await this.roomService.create(data.roomName);
            return { success: true, room };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    @SubscribeMessage('joinRoom')
    async handleJoinRoom(
        @MessageBody() data: { roomId: string; userId: string },
        @ConnectedSocket() client: Socket,
    ) {
        try {
            await this.roomService.addParticipant(data.roomId, data.userId);
            client.join(data.roomId);
            return { success: true };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    @SubscribeMessage('sendMessage')
    async handleMessage(
        @MessageBody() data: { text: string; userId: string; roomId: string },
        @ConnectedSocket() client: Socket,
    ) {
        try {
            const message = await this.messageService.create(
                data.text,
                data.userId,
                data.roomId,
            );

            // Broadcast the message to all clients in the room except the sender
            this.server.to(data.roomId).except(client.id).emit('newMessage', message);
            return { success: true, message };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    @SubscribeMessage('retrieveMessages')
    async handleRetrieveMessages(@MessageBody() data: { roomId: string; userId: string }) {
        try {
            const messages = await this.messageService.retrieveMessages(data.roomId, data.userId);
            return { success: true, messages };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }
}
