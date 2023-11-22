import { Module } from '@nestjs/common';
import { ProdottiService } from './prodotti.service';
import { ProdottiController } from './prodotti.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { prodottiEntity } from './entities/prodotti.entity';
import { Client, ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    TypeOrmModule.forFeature([prodottiEntity]),
    ClientsModule.register([
      {
        name: 'prodotto-aggiornato',
        transport: Transport.TCP,
        options: { port: 5000 },
      },
    ]),
  ],

  controllers: [ProdottiController],
  providers: [ProdottiService],
})
export class ProdottiModule {}
