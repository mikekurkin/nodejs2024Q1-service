import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { hashPassword, verifyPassword } from 'src/common/crypto';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';
import { User } from './user.interface';

@Entity()
export class UserEntity implements User {
  @ApiProperty({ format: 'uuid' })
  @PrimaryGeneratedColumn('uuid')
  readonly id: string; // uuid v4
  @ApiProperty()
  @Column()
  readonly login: string;
  @ApiProperty({ default: 1 })
  @VersionColumn()
  version: number; // integer number, increments on update
  @ApiProperty({ default: Date.now() })
  @CreateDateColumn({
    transformer: {
      to: (value) => value,
      from: (value: string) => new Date(value).getTime(),
    },
  })
  createdAt: number; // timestamp of creation
  @ApiProperty({ default: Date.now() })
  @UpdateDateColumn({
    transformer: {
      to: (value) => value,
      from: (value: string) => new Date(value).getTime(),
    },
  })
  updatedAt: number; // timestamp of last update

  @Exclude()
  @Column()
  passwordHash: string;
  @Exclude()
  set password(newPassword: string) {}
  @Exclude()
  setPassword = async (newPassword: string): Promise<void> => {
    return new Promise(async (res) => {
      if (
        !this.passwordHash ||
        !(await verifyPassword(newPassword, this.passwordHash))
      )
        this.passwordHash = await hashPassword(newPassword);
      res();
    });
  };

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
