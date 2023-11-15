import { PartialType } from '@nestjs/mapped-types';

import { IsEmail, IsString, Max, Min } from 'class-validator';
import { CreateclientiDto } from './create-clienti.dto';

export class LoginDto extends PartialType(CreateclientiDto) {
  @IsString()
  @IsEmail({}, { message: "L'email deve essere un indirizzo email valido" })
  email: string;
  @IsString()
  @Min(3)
  @Max(32)
  password: string;
}
