import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as pj from '../package.json';
import { getEnv } from './utils/config/get-env';
import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const { openApi, cors, helmet: helmetEnabled, port } = getEnv();

  const app = await NestFactory.create(AppModule);

  // Enable CORS
  if (cors) {
    logInit('CORS');
    app.enableCors();
  }

  // Helmet
  if (helmetEnabled) {
    logInit('Helmet');
    app.use(helmet());
  }

  // DTO Validation
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  // Set the base route as /api
  app.setGlobalPrefix('api');

  // Open API
  if (openApi) {
    logInit('Swagger');
    const config = new DocumentBuilder()
      .setTitle(pj.longName)
      .setDescription(pj.description)
      .setVersion(pj.version)
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('documentation', app, document);
  }

  // Versioning
  app.enableVersioning({
    type: VersioningType.HEADER,
    header: 'version',
  });

  await app.listen(port);
}

bootstrap();

const logInit = (name: string) => Logger.log('Is enabled!', name);
