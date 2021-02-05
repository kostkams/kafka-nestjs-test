import {NestFactory} from '@nestjs/core';
import {MicroserviceOptions, Transport} from '@nestjs/microservices';
import * as fs from 'fs';
import * as path from 'path';
import {ReceiverModule} from './receiver/receiver.module';
import {v4 as uuid} from 'uuid'

const bootstrapReceiver = async () => {
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(ReceiverModule, {
        transport: Transport.KAFKA,
        options: {
            client: {
                clientId: `receiver_${uuid()}`,
                brokers: ['localhost:9093'],
                ssl: {
                    rejectUnauthorized: false,
                    ca: [fs.readFileSync(path.resolve(__dirname, '..', 'kafka', 'consumer-ca1-signed.crt'), 'utf-8')],
                }
            },
            consumer: {
                groupId: 'receiver'
            }
        }
    });

    app.listen(() => console.log('ready'));
};

bootstrapReceiver();