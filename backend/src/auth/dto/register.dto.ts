import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class RegisterDto {
    @ApiProperty({ example: 'Ahmedou' })
    @IsString()
    @IsNotEmpty()
    firstName!: string;

    @ApiProperty({ example: 'SALEM' })
    @IsString()
    @IsNotEmpty()
    lastName!: string;

    @ApiProperty({ example: 'ahmedou@gmail.com' })
    @IsEmail()
    email!: string;

    @ApiProperty({ example: 'Password123' })
    @IsString()
    @MinLength(6)
    password!: string;
}