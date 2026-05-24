/**
 * createParamDecorator : créer un décorateur personnalisé pour les paramètres de méthode
 * ExecutionContext : accéder au contexte d’exécution de la requête
 */
import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { AuthenticatedUser } from "../strategies/jwt.strategy";

export const CurrentUser = createParamDecorator(
    (_data: unknown, context: ExecutionContext): AuthenticatedUser => {
        const request = context.switchToHttp().getRequest();
        return request.user;
    }
)