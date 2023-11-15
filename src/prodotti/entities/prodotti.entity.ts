import { IsNumber, IsString } from 'class-validator';
import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('prodotti')
export class prodottiEntity {
  @PrimaryColumn()
  @IsNumber()
  idProdotto: number;

  @Column()
  @IsString()
  nomeProdotto: string;

  @Column()
  @IsNumber()
  giacenza: number;

  @Column()
  @IsNumber()
  quantitaMinimaOrdine: number;

  @Column()
  @IsNumber()
  prezzo: number;
}
