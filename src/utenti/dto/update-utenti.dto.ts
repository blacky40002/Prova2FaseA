import { PartialType } from '@nestjs/mapped-types';
import { CreateUtentiDto } from './create-utenti.dto';

export class UpdateUtentiDto extends PartialType(CreateUtentiDto) {}
