import { PartialType } from '@nestjs/mapped-types';
import { CreateprodottiDTO } from './create-prodotti.dto';

export class UpdateProdottiDto extends PartialType(CreateprodottiDTO) {}
