import { Controller, Get } from '@nestjs/common';

@Controller('contacts')
export class ContactsController {

    /* 
    The @Get() decorator before the index() method instructs Nest to create an endpoint for the 
    corresponding route path and then map any coming request to the index() handler.
     Since we've specified a prefix for every route of the contacts controller as contacts, 
     Nest will send every GET request to the index() method.
    */
    @Get()
    index(): string {
      return "This action will return contacts";
    }    
}
