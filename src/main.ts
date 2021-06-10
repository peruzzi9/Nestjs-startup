import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
import { Logger } from '@nestjs/common';


const Port=process.env.PORT;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(Port);
  Logger.log(`Server started running on http://localhost:${Port}`, 'Bootstrap');
}
bootstrap();
