import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class verificaQuantitaPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const quantita = parseFloat(value);

    if (isNaN(quantita) || quantita <= 0) {
      throw new BadRequestException(
        'La quantità deve essere un numero valido e maggiore di zero',
      );
    }

    return quantita;
  }
}
