import { ConflictException, Injectable } from '@nestjs/common';
import { User, UserDocument, UserRole } from './schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

export type SafeUser = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
};

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async create(data: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }): Promise<SafeUser> {
    const existingUser = await this.userModel.findOne({ email: data.email });

    if (existingUser) {
      throw new ConflictException('Email already used');
    }

    const createdUser = await this.userModel.create(data);

    return this.toSafeUser(createdUser);
  }

  async findByEmail(email: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ email });
  }

  toSafeUser(user: UserDocument): SafeUser {
    return {
      id: user._id.toString(),
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
    };
  }
}
