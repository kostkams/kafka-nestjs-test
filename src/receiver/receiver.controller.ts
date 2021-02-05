import { Controller } from '@nestjs/common';
import {Ctx, KafkaContext, MessagePattern} from '@nestjs/microservices';
import {v4 as uuid} from 'uuid'

@Controller('receiver')
export class ReceiverController {
    private id: string;

    constructor() {
        this.id = uuid();
    }

    @MessagePattern('test')
    async test(@Ctx() context: KafkaContext){
        console.log(`${this.id} ${context.getTopic()} ${context.getArgs()}`)
        return this.id;
    }
}
