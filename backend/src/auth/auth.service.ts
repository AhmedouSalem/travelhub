import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);

    const user = await this.usersService.create({
      ...registerDto,
      password: hashedPassword,
    });

    const accessToken = await this.generateToken(user);

    return {
      user,
      accessToken,
    };
  }

  async login(loginDto: LoginDto) {
    const user = await this.usersService.findByEmail(loginDto.email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const passwordMatches = await bcrypt.compare(
      loginDto.password,
      user.password,
    );

    if (!passwordMatches) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const safeUser = this.usersService.toSafeUser(user);
    const accessToken = await this.generateToken(safeUser);

    return {
      user: safeUser,
      accessToken,
    };
  }

  private async generateToken(user: {
    id: string;
    email: string;
    role: string;
  }): Promise<string> {
    return this.jwtService.signAsync({
      sub: user.id,
      email: user.email,
      role: user.role,
    });
  }
}
