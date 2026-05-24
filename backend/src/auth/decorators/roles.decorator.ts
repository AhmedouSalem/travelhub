/**
 * Ce fichier crée un décorateur personnalisé @Roles(...) pour indiquer quelles routes sont réservées à certains rôles
 * Il ne protège pas la route à lui seul. Il attache une information metadata à la route.
 * Ensuite, un RolesGuard devra lire cette metadata et décider si l’utilisateur a le droit ou non.
 */

import { SetMetadata } from '@nestjs/common';// Il sert à attacher une information personnalisée à une classe ou à une méthode.
import { UserRole } from '../../users/schemas/user.schema';

export const ROLES_KEY = 'roles';// Cette constante représente le nom de la clé metadata.

/**
 * (...roles: UserRole[]) : un rest parameter en TypeScript. Les ... signifient que la fonction accepte plusieurs rôles
 */
export const Roles = (...roles: UserRole[]) => SetMetadata(ROLES_KEY, roles);