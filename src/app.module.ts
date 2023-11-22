import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { clientiModule } from './clienti/clienti.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProdottiModule } from './prodotti/prodotti.module';
import { LoggingService } from './EXCEPTIONFILTERS/Logging';
import { HttpExceptionFilter } from './EXCEPTIONFILTERS/Eccezzioni';

@Module({
  imports: [
    clientiModule,
    ConfigModule.forRoot({ isGlobal: true, cache: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: +(process.env.POSTGRES_PORT ?? 5432),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      autoLoadEntities: true,
      synchronize: true,
      migrationsTableName: 'migration',
      migrations: ['src/migration/*.ts'],
    }),
    ProdottiModule,
  ],
  controllers: [AppController],
  providers: [AppService, LoggingService, HttpExceptionFilter],
})
export class AppModule {}
