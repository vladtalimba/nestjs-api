import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { ProduseService } from './produse.service';
import { CreateProduseDto } from './dto/create-produse.dto';
import { UpdateProduseDto } from './dto/update-produse.dto';

@Controller('produse')
export class ProduseController {
  constructor(private readonly produseService: ProduseService) {}

  // Creates a dto when the POST request is accessed. Calls the create() function in the controller to save it to the db.
  @Post()
  create(@Body() createProduseDto: CreateProduseDto) {
    return this.produseService.create(createProduseDto);
  }

  // Call the findAll() function when the GET request is called.
  @Get()
  findAll() {
    return this.produseService.findAll();
  }

  // Call the findOne() function when the GET request is called. It requires the id .
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.produseService.findOne(id);
  }

  // Calls the update() function in the controller when the PUT request is accessed. Takes the id and the body of the element to be updated.
  @Put(':id')
  update(@Param('id') id: string, @Body() updateProduseDto: UpdateProduseDto) {
    return this.produseService.update(id, updateProduseDto);
  }

  // Calls the remove() function in the controller when the DELETE request is accessed. Takes the id of the element to be deleted.
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.produseService.remove(id);
  }
}
