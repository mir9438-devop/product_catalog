import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ResponseInterceptor } from './response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*',   // allow all origins
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: '*',  // allow all headers
  });

  app.useGlobalInterceptors(new ResponseInterceptor());
  
  await app.listen(process.env.PORT ?? 8111);
}
bootstrap();
