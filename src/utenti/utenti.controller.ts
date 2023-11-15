import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UtentiService } from './utenti.service';
import { CreateUtentiDto } from './dto/create-utenti.dto';
import { UpdateUtentiDto } from './dto/update-utenti.dto';

@Controller('utenti')
export class UtentiController {
  constructor(private readonly utentiService: UtentiService) {}

  @Post()
  create(@Body() createUtentiDto: CreateUtentiDto) {
    return this.utentiService.create(createUtentiDto);
  }

  @Get()
  findAll() {
    return this.utentiService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.utentiService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUtentiDto: UpdateUtentiDto) {
    return this.utentiService.update(+id, updateUtentiDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.utentiService.remove(+id);
  }
}
