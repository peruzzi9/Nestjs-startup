import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
import { Logger } from '@nestjs/common';
import * as helmet from 'helmet';
import * as rateLimit from 'express-rate-limit';
import * as csurf from 'csurf';

const Port = process.env.PORT;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  /**
   * Helmet can help protect your app from some well-known
   * web vulnerabilities by setting HTTP headers appropriately.
   * Generally, Helmet is just a collection of 12 smaller
   * middleware functions that set security-related HTTP headers
   *
   * https://github.com/helmetjs/helmet#how-it-works
   */
  app.use(helmet());


  /* 
  * The default Cors configuration is the equivalent of:
https://github.com/expressjs/cors#configuration-options
{
  "origin": "*",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "preflightContinue": false,
  "optionsSuccessStatus": 204,
  allowedHeaders: 'Content-Type, Authorization'
}
  */
  app.enableCors();


  // /**
  //  * we need this because "cookie" is true in csrfProtection
  //  */
  // app.use(cookieParser());

  // app.use(csurf({ cookie: true }));
  // or
  // app.use(csurf());


  /**
   ** To protect your applications from brute-force attacks
   ** User should not able to call API/access app more than 100 times in each 15 minute.
   */
  app.use(
    new rateLimit({
      windowMs: 15 * 60 * 1000,// 15 minutes
      max: 100,// limit each IP to 100 requests per windowMs
    }),
  );

  await app.listen(Port);
  Logger.log(`Server started running on http://localhost:${Port}`, 'Bootstrap');
}
bootstrap();
