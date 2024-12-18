import { Controller, Get, HttpException, HttpStatus, Param } from "@nestjs/common";
import { MessageService } from "./message.service";


@Controller('messages')
export class MessageController {
    constructor(private readonly messageService: MessageService) { }

    @Get(':roomId')
    retrieveMessages(@Param('roomId') roomId: string) {
        return this.messageService.retrieveMessages(roomId);
    }
}
