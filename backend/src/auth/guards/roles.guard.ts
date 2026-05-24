import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { UserRole } from "../../users/schemas/user.schema";
import { Reflector } from "@nestjs/core";// Il sert à lire les metadata attachées par des décorateurs.
import { ROLES_KEY } from "../decorators/roles.decorator";
import { RequestWithUser } from "../decorators/current-user.decorator";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {
        
    }

    // Cette méthode est appelée automatiquement par NestJS quand une route protégée par ce guard est appelée.
    canActivate(context: ExecutionContext): boolean {
        /** 
         * this.reflector.getAllAndOverride :
         * Cette méthode lit les metadata sur :
         *   context.getHandler()
         *   context.getClass()
         * et retourne la valeur trouvée.
         * override : Cela veut dire que si une metadata est définie à la fois sur la méthode et sur la classe, celle de la méthode est prioritaire.
         */
        const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(
            ROLES_KEY,
            [context.getHandler(), context.getClass()],// par exemple [create, CatalogController]
        );

        if (!requiredRoles || requiredRoles.length === 0) {
            return true;
        }
        const request = context.switchToHttp().getRequest<RequestWithUser>();
        const user = request.user;

        if (!user) {
            return false;
        }

        return requiredRoles.includes(user.role);
    }
}