import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './EXCEPTIONFILTERS/Eccezzioni';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const httpExceptionFilter = app.get<HttpExceptionFilter>(HttpExceptionFilter);

  app.useGlobalFilters(httpExceptionFilter);

  await app.listen(3000);
}
bootstrap();
