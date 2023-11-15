import { IsNumber, IsString, Min } from 'class-validator';

export class CreateprodottiDTO {
  @IsNumber()
  idProdotto: number;

  @IsString()
  nomeProdotto: string;

  @IsNumber()
  @Min(1, { message: 'la giacenza deve essere maggiore di 0' })
  giacenza: number;

  @IsNumber()
  @Min(1, {
    message: 'la quantita deve essere maggiore di 0',
  })
  quantitaMinimaOrdine: number;

  @IsNumber()
  @Min(0, { message: 'il prezzo deve essere maggiore di 0' })
  prezzo: number;
}
