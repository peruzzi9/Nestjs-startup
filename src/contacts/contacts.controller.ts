import { Controller, Get } from '@nestjs/common';
import { Post, Put, Delete, Body, Param } from '@nestjs/common';
import { Contact } from './contact.entity';
import { ContactsService } from './contacts.service';

@Controller('contacts')
export class ContactsController {
  constructor(private contactsService: ContactsService) {}
  /* 
    The @Get() decorator before the index() method instructs Nest to create an endpoint for the 
    corresponding route path and then map any coming request to the index() handler.
     Since we've specified a prefix for every route of the contacts controller as contacts, 
     Nest will send every GET request to the index() method.
    */
  @Get()
  index(): Promise<Contact[]> {
    return this.contactsService.findAll();
  }

  @Post('create')
  async create(@Body() contactData: Contact): Promise<any> {
    return this.contactsService.create(contactData);
  }

  @Put(':id/update')
  async update(@Param('id') id, @Body() contactData: Contact): Promise<any> {
    contactData.id = Number(id);
    console.log('Update #' + contactData.id);
    return this.contactsService.update(contactData);
  }

  @Delete(':id/delete')
  async delete(@Param('id') id): Promise<any> {
    return this.contactsService.delete(id);
  }
}
