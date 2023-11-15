import { Repository } from 'typeorm';
import { clientiEntity } from './entities/clienti.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ContiRepository extends Repository<clientiEntity> {
  constructor(
    @InjectRepository(clientiEntity)
    repository: Repository<clientiEntity>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
}
