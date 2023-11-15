import { PartialType } from '@nestjs/mapped-types';
import { CreateclientiDto } from './create-clienti.dto';

export class UpdateclientiDto extends PartialType(CreateclientiDto) {}
