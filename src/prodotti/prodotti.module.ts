import { Module } from '@nestjs/common';
import { ProdottiService } from './prodotti.service';
import { ProdottiController } from './prodotti.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { prodottiEntity } from './entities/prodotti.entity';

@Module({
  imports: [TypeOrmModule.forFeature([prodottiEntity])],
  controllers: [ProdottiController],
  providers: [ProdottiService],
})
export class ProdottiModule {}
