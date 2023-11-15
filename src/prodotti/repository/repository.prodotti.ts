import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { prodottiEntity } from '../entities/prodotti.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ContiRepository extends Repository<prodottiEntity> {
  constructor(
    @InjectRepository(prodottiEntity)
    repository: Repository<prodottiEntity>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
}
