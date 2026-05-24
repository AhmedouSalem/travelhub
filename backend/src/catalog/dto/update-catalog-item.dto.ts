/**
 * PartialType est une fonction utilitaire fournie par NestJS Swagger.
 * Elle permet de créer une nouvelle classe DTO où tous les champs d’une classe existante deviennent optionnels.
 */
import { PartialType } from "@nestjs/swagger";
import { CreateCatalogItemDto } from "./create-catalog-item.dto";

export class UpdateCatalogItemDto extends PartialType(CreateCatalogItemDto) {}