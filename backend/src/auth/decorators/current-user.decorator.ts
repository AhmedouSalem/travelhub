/**
 * createParamDecorator : créer un décorateur personnalisé pour les paramètres de méthode
 * ExecutionContext : accéder au contexte d’exécution de la requête
 */
import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { AuthenticatedUser } from "../strategies/jwt.strategy";
import { Request } from "express";

/** 
 * Ce type sert à dire à TypeScript :
 * La requête HTTP peut contenir une propriété user.
 */
export type RequestWithUser = Request & {
  user?: AuthenticatedUser;
};

export const CurrentUser = createParamDecorator(
    (_data: unknown, context: ExecutionContext): AuthenticatedUser => {
        const request = context.switchToHttp().getRequest<RequestWithUser>();
        return request.user!;
    }
)