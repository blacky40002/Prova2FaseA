import { Module } from '@nestjs/common';
import { UtentiService } from './utenti.service';
import { UtentiController } from './utenti.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { utentiEntity } from './entities/utenti.entity';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'src/guard/guard.utenti';

@Module({
  imports: [TypeOrmModule.forFeature([utentiEntity])],
  controllers: [UtentiController],
  providers: [
    UtentiService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class UtentiModule {}
