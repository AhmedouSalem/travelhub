/**
 * Un guard dans NestJS sert à protéger une route.
 * ce guard vérifie que la requête contient un JWT valide avant d’autoriser l’accès.
 */
import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
