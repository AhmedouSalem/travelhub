import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsMongoId, IsOptional, Max, Min } from 'class-validator';

export class CreateBookingDto {
    @ApiProperty({
        example: '665f2b7c9c9f1a0012345678',
        description: 'Catalog item MongoDB id',
    })
    @IsMongoId()
    catalogItemId!: string;

    @ApiPropertyOptional({
        example: 1,
        description: 'Number of reservations for this service',
    })
    @IsOptional()
    @IsInt()
    @Min(1)
    @Max(10)
    quantity?: number;
}