import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  ParseIntPipe,
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
    return this.prodottiService.createProdotti(prodottoData);
  }

  @Public()
  @Patch('ordinare/:idOrdine')
  async ordinareProdotti(
    @Param('idOrdine') idOrdine: number,
    @Body('quantita', ParseIntPipe) quantita: number,
  ): Promise<prodottiEntity> {
    return this.prodottiService.ordinareProdotti(idOrdine, quantita);
  }

  @Public()
  @Patch(':idVendita/:quantita')
  async vendereProdotti(
    @Param('idVendita') idVendita: number,
    @Body('quantita', ParseIntPipe) quantita: number,
  ): Promise<prodottiEntity> {
    return this.prodottiService.vendereProdotti(idVendita, quantita);
  }
}
