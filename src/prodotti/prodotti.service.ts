import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { InjectRepository } from '@nestjs/typeorm';
import { prodottiEntity } from './entities/prodotti.entity';
import { Repository } from 'typeorm';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class ProdottiService {
  constructor(
    @InjectModel('Prodotto') private prodottoModel: Model<IProdotto>,
    @Inject('prodotto-aggiornato-client')
    private readonly comunicationClientAggiornato: ClientProxy,
    @Inject('prodotto-insufficente-client')
    private readonly comunicationClientInsufficente: ClientProxy,
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
      throw new BadRequestException('Data non valido.');
    }
  }

  async ordinareProdotti(
    idProdotto: number,
    quantità: number,
  ): Promise<prodottiEntity> {
    const prodotto = await this.prodottiRepository.findOneBy({ idProdotto });

    if (!prodotto) {
      throw new NotFoundException('Prodotto non trovato');
    }

    prodotto.giacenza += quantità;
    this.comunicationClientAggiornato.emit('prodotto-aggiornato', {
      id: idProdotto,
      giacenza: prodotto.giacenza,
    });
    return this.prodottiRepository.save(prodotto);
  }

  async vendereProdotti(
    idProdotto: number,
    quantità: number,
  ): Promise<prodottiEntity> {
    const prodotto = await this.prodottiRepository.findOneBy({ idProdotto });

    if (!prodotto) {
      throw new NotFoundException('Prodotto non trovato');
    }

    if (prodotto.giacenza < quantità) {
      this.comunicationClientInsufficente.emit('prodotto-insufficente', {
        id: idProdotto,
        quantitàRichiesta: quantità,
      });
      throw new BadRequestException('Giacenza insufficiente');
    }

    prodotto.giacenza -= quantità;
    return this.prodottiRepository.save(prodotto);
  }
}
