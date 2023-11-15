import { Type } from 'class-transformer';
import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  Matches,
} from 'class-validator';

export class CreateclientiDto {
  @Length(5, 5)
  @Matches(/^[A-Z]+$/, {
    message: 'Il codiceCliente deve essere maiuscolo e di 5 caratteri',
  })
  @IsString()
  codiceCliente: string;
  @IsString()
  @IsNotEmpty({ message: 'Il nome non può essere vuoto' })
  nome: string;
  @IsString()
  @IsNotEmpty({ message: 'Il cognome non può essere vuoto' })
  cognome: string;

  @Type(() => Date)
  @IsDate({ message: 'La data di nascita deve essere una data valida' })
  dataDiNascita: Date;
  @IsString()
  @IsEmail({}, { message: "L'email deve essere un indirizzo email valido" })
  email: string;

  @Length(8)
  @IsString()
  password: string;
}
