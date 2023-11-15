import { Repository } from 'typeorm';
import { utentiEntity } from './entities/utenti.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ContiRepository extends Repository<utentiEntity> {
  constructor(
    @InjectRepository(utentiEntity)
    repository: Repository<utentiEntity>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
}
