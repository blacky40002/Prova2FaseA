import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { clientiService } from './clienti.service';
import { CreateclientiDto } from './dto/create-clienti.dto';
import { UpdateclientiDto } from './dto/update-clienti.dto';
import { LoginDto } from './dto/loginDTO';
import { validazionePipe } from 'src/pipes/pipes.cliente';
import { AuthGuard } from 'src/guard/guard.clienti';
import { Public } from 'src/decoratos/ispublic.recorator.utenti';

@Controller('clienti')
export class clientiController {
  constructor(private readonly clientiService: clientiService) {}

  @Post('login')
  @Public()
  async login(@Body() cliente: LoginDto) {
    return await this.clientiService.login(cliente);
  }

  @Get(':codiceCliente')
  @UseGuards(AuthGuard)
  @UsePipes(new validazionePipe())
  async getCliente(@Param('codiceCliente') codiceCliente: string) {
    return await this.clientiService.getCliente(codiceCliente);
  }

  @Post('registra')
  @Public()
  async create(@Body() utente: CreateclientiDto) {
    return await this.clientiService.registraCliente(utente);
  }
}
