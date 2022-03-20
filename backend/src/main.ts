import { All } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaService } from './prisma/prisma.service';

const port = 3001;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // https://docs.nestjs.com/recipes/prisma
  const prismaService: PrismaService = app.get(PrismaService);
  prismaService.enableShutdownHooks(app);

  app.enableCors({
    origin: '*',
    methods: 'GET,PUT,PATCH,POST,DELETE',
  });
  await app.listen(port, () =>
    console.log(`::::: Listening on port ${port} :::::`),
  );
}
bootstrap();
