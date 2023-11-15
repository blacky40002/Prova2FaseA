import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateclientiDto } from './dto/create-clienti.dto';
import { UpdateclientiDto } from './dto/update-clienti.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { clientiEntity } from './entities/clienti.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/loginDTO';

import { error } from 'console';

@Injectable()
export class clientiService {
  constructor(
    @InjectRepository(clientiEntity)
    private utentiRepository: Repository<clientiEntity>,
    private readonly jwtService: JwtService,
  ) {}

  create(createclientiDto: CreateclientiDto) {
    return 'This action adds a new clienti';
  }

  findAll() {
    return `This action returns all clienti`;
  }

  findOne(id: number) {
    return `This action returns a #${id} clienti`;
  }

  update(id: number, updateclientiDto: UpdateclientiDto) {
    return `This action updates a #${id} clienti`;
  }

  remove(id: number) {
    return `This action removes a #${id} clienti`;
  }

  async login(loginData: LoginDto): Promise<any> {
    const utente = await this.utentiRepository.findOneBy({
      email: loginData.email,
    });
    if (utente?.password !== loginData.password) {
      throw new UnauthorizedException();
    }
    const payload = { sub: utente.codiceCliente };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async getCliente(codiceCliente: string): Promise<any> {
    const cliente = await this.utentiRepository.findOne({
      where: { codiceCliente: codiceCliente },
      select: ['codiceCliente', 'nome', 'cognome', 'email', 'dataDiNascita'],
    });

    if (!cliente) {
      throw new error('Cliente non trovato');
    }

    return cliente;
  }

  async registraCliente(
    newRegister: CreateclientiDto,
  ): Promise<boolean | Error> {
    try {
      const nuovoUtente = this.utentiRepository.create(newRegister);
      await this.utentiRepository.save(nuovoUtente);
      return true;
    } catch (error) {
      console.log('errore creazione utente', error);
      throw new Error();
    }
  }
}
