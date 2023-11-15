import { IsDate, IsEmail, IsNotEmpty, Length, Matches } from 'class-validator';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
} from 'typeorm';

@Entity('utenti')
export class utentiEntity {
  @PrimaryColumn()
  @Length(5, 5)
  @Matches(/^[A-Z]+$/, {
    message: 'codiceCliente deve essere maiuscolo e di 5 caratteri',
  })
  codiceCliente: string;
  @Column()
  @IsNotEmpty()
  nome: string;

  @Column()
  @IsNotEmpty()
  cognome: string;

  @Column()
  @IsDate()
  dataDiNascita: Date;

  @Column()
  @IsEmail()
  email: string;

  @Column()
  @Length(8)
  password: string;

  @CreateDateColumn()
  dataRegistrazione: Date;

  @BeforeInsert()
  checkDate() {
    if (this.dataDiNascita >= new Date()) {
      throw new Error(
        'La DataDiNascita deve essere antecedente alla data di registrazione.',
      );
    }
  }
}
