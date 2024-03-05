import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UserEntity } from './user.entity';
import { User } from './user.interface';

@Injectable()
export class UserService {
  private readonly users: User[] = [];

  async create(dto: CreateUserDto): Promise<User> {
    const user = new UserEntity({ ...dto });
    this.users.push(user);
    return await this.findOne(user.id);
  }

  async findAll(): Promise<User[]> {
    return this.users;
  }

  async findOne(id: string): Promise<User> {
    return this.users.find((user) => user.id == id) ?? null;
  }

  async updatePassword(
    id: string,
    { oldPassword, newPassword }: UpdatePasswordDto,
  ): Promise<User> {
    const user = this.users.find((user) => user.id == id);
    if (user) {
      if (user.password != oldPassword) return Promise.reject();
      user.password = newPassword;
    }
    return user;
  }

  async remove(id: string): Promise<void> {
    const user = this.users.find((user) => user.id == id);
    if (!user) return Promise.reject();
    this.users.splice(this.users.indexOf(user), 1);
  }
}
