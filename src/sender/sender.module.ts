import {Module} from '@nestjs/common';
import {ClientsModule, Transport} from '@nestjs/microservices';
import * as fs from 'fs';
import * as path from 'path';
import {SenderController} from './sender.controller';

@Module({
  imports:[
      ClientsModule.register([
        {
          name: 'sender',
          transport: Transport.KAFKA,
          options: {
            client: {
              clientId: 'sender',
              brokers: ['localhost:9093'],
              ssl: {
                rejectUnauthorized: false,
                ca: [fs.readFileSync(path.resolve(__dirname, '..', '..', 'kafka', 'producer-ca1-signed.crt'), 'utf-8')],
              }
            }
          }
        }
      ])
  ],
  controllers: [SenderController]
})
export class SenderModule {}
