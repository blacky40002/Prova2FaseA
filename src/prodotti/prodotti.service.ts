import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { prodottiEntity } from './entities/prodotti.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProdottiService {
  constructor(
    @InjectRepository(prodottiEntity)
    private prodottiRepository: Repository<prodottiEntity>,
  ) {}

  async createProdotti(prodottoData: prodottiEntity): Promise<prodottiEntity> {
    if (
      prodottoData.giacenza > 0 &&
      prodottoData.quantitaMinimaOrdine > 0 &&
      prodottoData.prezzo > 0
    ) {
      const newProdotto = this.prodottiRepository.create(prodottoData);
      return await this.prodottiRepository.save(newProdotto);
    } else {
      throw new BadRequestException('data non valido.');
    }
  }

  async ordinareProdotti(
    idProdotto: number,
    quantita: number,
  ): Promise<prodottiEntity> {
    const prodotto = await this.prodottiRepository.findOne({
      where: { idProdotto },
      select: ['idProdotto', 'quantitaMinimaOrdine'],
    });
    if (!prodotto) {
      throw new NotFoundException('Product not found');
    }

    if (quantita <= 0) {
      throw new BadRequestException('quantita dve essere maggiore di zero');
    }

    prodotto.giacenza += quantita;

    // Save the updated product
    return await this.prodottiRepository.save(prodotto);
  }

  async vendereProdotti(
    idProdotto: number,
    quantita: number,
  ): Promise<prodottiEntity> {
    // Find the product by id
    const prodotto = await this.prodottiRepository.findOne({
      where: { idProdotto },
      select: ['idProdotto', 'giacenza'],
    });
    if (!prodotto) {
      throw new NotFoundException('prodotto non trovato');
    }

    if (quantita <= 0 || quantita > prodotto.giacenza) {
      throw new BadRequestException('quantita non sufficente');
    }

    prodotto.giacenza -= quantita;

    return await this.prodottiRepository.save(prodotto);
  }
}
