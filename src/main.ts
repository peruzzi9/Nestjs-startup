import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
import { Logger, ValidationPipe } from '@nestjs/common';
import * as helmet from 'helmet';
import * as rateLimit from 'express-rate-limit';
import * as csurf from 'csurf';
import { json } from 'express';
import *  as xss from 'xss-clean';
import * as cookieParser from 'cookie-parser';

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
   app.use(cookieParser());

  // app.use(csurf({ cookie: true }));
  // or
  // app.use(csurf());

  /**
   ** To protect your applications from brute-force attacks
   ** User should not able to call API/access app more than 100 times in each 15 minute.
   */
  app.use(
    new rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // limit each IP to 100 requests per windowMs
      message: 'Too many requests', // message to send
    }),
  );

  /**
   ** To protect your applications from uploading files larger then 50mb
   */
  app.use('/uploads', json({ limit: '50mb' }));
  /**
   ** To protect your applications API request form body attack larger than 100kb
   */
  app.use(json({ limit: '100kb' }));
  /**
   ** To protect your applications form  XSS attacks
    you can sanitize user data, on input. This is very easy to implement, and we can use another useful dependency called xss-clean.
    This dependency will prevent users from inserting HTML & Scripts on input.
   */
  // Data Sanitization against XSS
  app.use(xss());

  /**
   ** Apply validation for all inputs globally depending on DTO
   */
   app.useGlobalPipes(
    new ValidationPipe({
      /** 
       * When set to true, this will automatically remove non-whitelisted properties (those without any decorator in the validation class).
       * For example, if our handler expects email and password properties, but a request also includes an age property,
       * this property can be automatically removed from the resulting DTO .
       * 
       * Alternatively, you can stop the request from processing when non-whitelisted properties are present
       * , and return an error response to the user. To enable this
       * , set the (forbidNonWhitelisted) option property to true
       * , in combination with setting whitelist to true.
       */
      whitelist: true,// enable the filter
      /***
       * Transform input objects to their corresponding DTO objects
       */
      transform: true,
      disableErrorMessages: true, // do not display error message in response body when invalid paramas
    }),
  );

  await app.listen(Port);
  Logger.log(`Server started running on http://localhost:${Port}`, 'Bootstrap');
}
bootstrap();
