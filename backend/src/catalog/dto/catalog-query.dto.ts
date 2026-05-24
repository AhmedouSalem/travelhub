import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { CatalogCategory } from '../schemas/catalog-item.schema';

export class CatalogQueryDto {
    @ApiPropertyOptional({
        enum: CatalogCategory,
        example: CatalogCategory.MEAL,
    })
    @IsOptional()
    @IsEnum(CatalogCategory)
    category?: CatalogCategory.MEAL;

    @ApiPropertyOptional({ example: 'japon' })
    @IsOptional()
    @IsString()
    search?: string;
}