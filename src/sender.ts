import {NestFactory} from '@nestjs/core';
import {NestExpressApplication} from '@nestjs/platform-express';
import {SenderModule} from './sender/sender.module';

const bootstrapSender = async () => {
    const app = await NestFactory.create<NestExpressApplication>(SenderModule);
    await app.listen(1111, () => console.log('ready'))
}

bootstrapSender();