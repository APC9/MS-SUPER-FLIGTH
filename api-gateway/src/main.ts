import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter, TimeoutInterceptor } from './common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //Configuracion de Interceptores y Filtros Globales
  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalInterceptors(new TimeoutInterceptor());

  //Swagger
  const options = new DocumentBuilder()
    .setTitle('Aplicacion de Vuelos')
    .setDescription('Aplicacion de Vuelos microservices')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('/api/docs', app, document, {
    swaggerOptions: {
      filter: true,
    },
  });

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
