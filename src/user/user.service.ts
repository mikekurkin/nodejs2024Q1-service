import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { verifyPassword } from 'src/common/crypto';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UserEntity } from './user.entity';
import { User } from './user.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async create(dto: CreateUserDto): Promise<User> {
    const user = new UserEntity({ ...dto });
    await user.setPassword(dto.password);
    await this.usersRepository.save(user);
    return await this.findOne(user.id);
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOne(id: string): Promise<User> {
    return this.usersRepository.findOneBy({ id });
  }

  async updatePassword(
    id: string,
    { oldPassword, newPassword }: UpdatePasswordDto,
  ): Promise<User> {
    const user = await this.usersRepository.findOneBy({ id });
    if (user) {
      if (!(await verifyPassword(oldPassword, user.passwordHash)))
        return Promise.reject();
      await user.setPassword(newPassword);
      await this.usersRepository.save(user);
    }
    return user;
  }

  async remove(id: string): Promise<void> {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) return Promise.reject();
    this.usersRepository.remove([user]);
  }
}
