import { Injectable } from '@nestjs/common';
import { CreateUtentiDto } from './dto/create-utenti.dto';
import { UpdateUtentiDto } from './dto/update-utenti.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { utentiEntity } from './entities/utenti.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UtentiService {
  constructor(
    @InjectRepository(utentiEntity)
    private contoCorrenteRepository: Repository<utentiEntity>,
  ) {}

  create(createUtentiDto: CreateUtentiDto) {
    return 'This action adds a new utenti';
  }

  findAll() {
    return `This action returns all utenti`;
  }

  findOne(id: number) {
    return `This action returns a #${id} utenti`;
  }

  update(id: number, updateUtentiDto: UpdateUtentiDto) {
    return `This action updates a #${id} utenti`;
  }

  remove(id: number) {
    return `This action removes a #${id} utenti`;
  }
}
