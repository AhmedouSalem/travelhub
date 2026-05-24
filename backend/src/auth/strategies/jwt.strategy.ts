/** 
 * Ce fichier sert à valider les JWT envoyés par le frontend.
 */
import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

/** 
 * Son rôle est de permettre à NestJS d’utiliser des stratégies d’authentification
 * (jwt, local, google, github)
 */
import { PassportStrategy } from "@nestjs/passport";

/**
 * passport-jwt est la stratégie Passport spécialisée pour les JWT.
 * Strategy : la stratégie qui sait valider un JWT
 * ExtractJwt : outil qui sait extraire le token depuis la requête HTTP
 */
import { ExtractJwt, Strategy } from "passport-jwt";
import { UserRole } from "../../users/schemas/user.schema";

export type JwtPayload = {
    sub: string;
    email: string;
    role: UserRole;
}

export type AuthenticatedUser = {
    id: string;
    email: string;
    role: UserRole;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {// Par défaut, cette strategy sera appelée avec le nom : jwt dans AuthGuard par exemple
    constructor(private readonly configService: ConfigService) {
        const secret = configService.get<string>('JWT_SECRET');

        if (!secret) {
            throw new InternalServerErrorException('JWT secret is not configured');
        }

        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),// Récupère le token dans le header Authorization, au format Bearer Token
            ignoreExpiration: false,
            secretOrKey: secret,
        });
    }

    /**
     * Cette méthode est appelée automatiquement par Passport après validation du token.
     * validate() n’est appelée que si :
     *  - le token existe;
     *  - le token est bien signé ;
     *  - le token n'est pas expiré.
     */
    validate(payload: JwtPayload): AuthenticatedUser {
        // Ce retour sera automatiquement attaché à la requête : Donc dans une route protégée, on pourra récupérer l’utilisateur connecté (request.user).
        return {
            id: payload.sub,
            email: payload.email,
            role: payload.role,
        };
    }
}