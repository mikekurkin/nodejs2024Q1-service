import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';
import { hashPassword, verifyPassword } from '../common/crypto';
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
  set password(newPassword: string) {
    this.passwordHash = null;
    this.promises.push(
      hashPassword(newPassword).then((hash) => (this.passwordHash = hash)),
    );
  }

  @Exclude()
  @BeforeInsert()
  @BeforeUpdate()
  private async awaitReadiness() {
    await Promise.allSettled(this.promises);
  }

  @Exclude()
  private promises: Promise<any>[] = [];

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
