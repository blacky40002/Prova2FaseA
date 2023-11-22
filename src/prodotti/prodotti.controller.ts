import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  ParseIntPipe,
  BadRequestException,
  HttpException,
} from '@nestjs/common';
import { ProdottiService } from './prodotti.service';
import { prodottiEntity } from './entities/prodotti.entity';
import { Public } from 'src/decoratos/ispublic.recorator.utenti';

@Controller('prodotti')
export class ProdottiController {
  constructor(private readonly prodottiService: ProdottiService) {}

  @Public()
  @Post()
  async createProdotti(
    @Body() prodottoData: prodottiEntity,
  ): Promise<prodottiEntity> {
    if (!prodottoData) {
      throw new BadRequestException('Dati del prodotto mancanti');
    }
    try {
      return this.prodottiService.createProdotti(prodottoData);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Public()
  @Patch('ordinare/:idOrdine')
  async ordinareProdotti(
    @Param('idOrdine') idOrdine: number,
    @Body('quantita', ParseIntPipe) quantita: number,
  ): Promise<prodottiEntity> {
    if (!idOrdine || !quantita) {
      throw new BadRequestException(
        'ID ordine o quantità mancanti o non validi.',
      );
    }
    try {
      return this.prodottiService.ordinareProdotti(idOrdine, quantita);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Public()
  @Patch('vendere/:idVendita/')
  async vendereProdotti(
    @Param('idVendita') idVendita: number,
    @Body('quantita', ParseIntPipe) quantita: number,
  ): Promise<prodottiEntity> {
    if (!idVendita || !quantita) {
      throw new BadRequestException(
        'ID vendita o quantità mancanti o non validi.',
      );
    }
    try {
      return this.prodottiService.vendereProdotti(idVendita, quantita);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
