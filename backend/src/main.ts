import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestFactory } from '@nestjs/core'; // NestFactory sert à créer une application NestJS à partir d’un module principal, ici AppModule.
import { AppModule } from './app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common'; // ValidationPipe sert à valider automatiquement les données envoyées par le client

async function bootstrap() {
  const app: INestApplication = await NestFactory.create(AppModule);

  /** pipes globalaux : Applique cette validation à toute l’application
   * Un pipe dans NestJS sert souvent à transformer ou valider les données entrantes.
   * 
   */
  app.useGlobalPipes(
    new ValidationPipe({ // Ce pipe va valider automatiquement les DTO.
      whitelist: true, // option supprime automatiquement les champs qui ne sont pas définis dans le DTO.
      forbidNonWhitelisted: true, // Au lieu de simplement supprimer les champs non autorisés, NestJS va rejeter la requête : 400 Bad Request
      transform: true, // ette option transforme automatiquement les données reçues vers les types attendus.
    }),
  );

  app.enableCors({
    origin: 'http://localhost:5173',
    credentials: true, // option autorise l’envoi de credentials : cookies, headers d'auth, info de session.
  });

  const config = new DocumentBuilder()
  .setTitle('TravelHub API')
  .setDescription('API REST de la platforme TravelHub')
  .setVersion('1.0')
  .addBearerAuth()
  .build();

  const document = SwaggerModule.createDocument(app, config); // génère la doc Swagger à partir de l'app NestJS.
  SwaggerModule.setup('api/docs', app, document); // rend Swagger accessible dans le navigateur.

  const port = process.env.PORT ?? 3000;
  await app.listen(port);

  console.log(`TravelHub API running on http://localhost:${app.getUrl()}`);
  console.log(`Swagger available on http://localhost:${app.getUrl()}/api/docs`);
}
bootstrap();
