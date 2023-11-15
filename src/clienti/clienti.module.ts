import { Module } from '@nestjs/common';
import { clientiService } from './clienti.service';
import { clientiController } from './clienti.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { clientiEntity } from './entities/clienti.entity';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'src/guard/guard.clienti';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([clientiEntity]),
    ConfigModule.forRoot({ isGlobal: true, cache: true }), //carica .ENV

    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '120s' },
    }),
  ],
  controllers: [clientiController],
  providers: [
    clientiService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class clientiModule {}
