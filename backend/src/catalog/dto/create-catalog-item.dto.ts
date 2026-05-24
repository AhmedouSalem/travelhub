import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
    IsBoolean,
    IsEnum,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
    Min,
} from 'class-validator';
import { CatalogCategory } from '../schemas/catalog-item.schema';

export class CreateCatalogItemDto {
    @ApiProperty({ example: 'Film documentaire - Destination Japon' })
    @IsString()
    @IsNotEmpty()
    title!: string;

    @ApiProperty({
        example:
            'Un documentaire de voyage disponible pendant le trajet pour les passagers.',
    })
    @IsString()
    @IsNotEmpty()
    description!: string;

    @ApiProperty({
        enum: CatalogCategory,
        example: CatalogCategory.FILM,
    })
    @IsEnum(CatalogCategory)
    category!: CatalogCategory;

    @ApiProperty({ example: 4.99 })
    @IsNumber()
    @Min(0)
    price!: number;

    @ApiPropertyOptional({ example: true })
    @IsOptional()
    @IsBoolean()
    available?: boolean;

    @ApiPropertyOptional({
        example: 'https://example.com/images/japan-documentary.jpg',
    })
    @IsOptional()
    @IsString()
    imageUrl?: string;

}