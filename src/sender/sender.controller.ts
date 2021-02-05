import {Controller, Get, Inject} from '@nestjs/common';
import {ClientKafka} from '@nestjs/microservices';

@Controller('')
export class SenderController {
    constructor(@Inject('sender') private readonly client: ClientKafka ) {
    }

    onModuleInit() {
        this.client.subscribeToResponseOf('test');
    }

    @Get()
    async get() {
        return this.client.send('test', {});
    }
}
