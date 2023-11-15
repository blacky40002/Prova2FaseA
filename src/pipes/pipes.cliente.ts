import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class validazionePipe implements PipeTransform {
  transform(value: any) {
    if (!value.match(/^[A-Z]{5}$/)) {
      throw new BadRequestException('CodiceCliente non valido');
    }
    return value;
  }
}
