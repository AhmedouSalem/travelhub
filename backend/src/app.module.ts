import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

/**
 * @nestjs/config permet de gérer la configuration de l’application, notamment les variables d’environnement
 * ConfigModule sert à charger les variables d’environnement.
 * ConfigService sert à lire ces variables dans le code.
 */
import { ConfigModule, ConfigService } from '@nestjs/config'; 

/** @nestjs/mongoose est l’intégration officielle entre NestJS et Mongoose.
 * Mongoose est une bibliothèque Node.js qui permet de travailler avec MongoDB en utilisant des modèles, des schémas et des objets TypeScript/JavaScript.
 */
import { MongooseModule } from '@nestjs/mongoose';

import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    /** initialiser le module de configuration
     * forRoot() veut dire : configuration principale, chargée au démarrage de l’application.
     * permet à NestJS de lire le fichier .env
     */
    ConfigModule.forRoot({
      isGlobal: true, /** rend ConfigModule disponible partout dans l’application.
      injecter ConfigService dans d’autres services sans réimporter ConfigModule à chaque fois */
    }),

    /** initialise la connexion MongoDB de manière asynchrone.
     * forRootAsync() est utilisé quand la configuration dépend d’un service, ici ConfigService.
     * Parce que NestJS doit d’abord charger la configuration, puis lire MONGO_URI, puis établir la connexion MongoDB.
     */
    MongooseModule.forRootAsync({
      imports: [ConfigModule], /** dépendance explicite */
      inject: [ConfigService], // ConfigService dans la fonction useFactory

      /** useFactory est une fonction qui construit dynamiquement la configuration de Mongoose.
       * Cette fonction retourne un objet de configuration pour MongoDB.
       */
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI'), // Mongoose utilise cette URI pour se connecter à MongoDB.
      }),
    }),
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
