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
  HttpException,
  HttpStatus,
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
    try {
      return await this.clientiService.login(cliente);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNAUTHORIZED);
    }
  }

  @Get(':codiceCliente')
  @UseGuards(AuthGuard)
  @UsePipes(new validazionePipe())
  async getCliente(@Param('codiceCliente') codiceCliente: string) {
    try {
      return await this.clientiService.getCliente(codiceCliente);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @Post('registra')
  @Public()
  async create(@Body() utente: CreateclientiDto) {
    try {
      return await this.clientiService.registraCliente(utente);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
