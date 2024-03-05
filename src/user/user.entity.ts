import { Exclude } from 'class-transformer';
import { randomUUID } from 'crypto';
import { User } from './user.interface';

export class UserEntity implements User {
  readonly id: string; // uuid v4
  readonly login: string;
  version: number; // integer number, increments on update
  createdAt: number; // timestamp of creation
  updatedAt: number; // timestamp of last update

  @Exclude()
  private _password: string;
  @Exclude()
  get password() {
    return this._password;
  }
  set password(newPassword) {
    if (this._password == newPassword) return;
    this._password = newPassword;
    this.updatedAt = Date.now();
    this.version += 1;
  }

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
    if (this.id == undefined) this.id = randomUUID();
    this.createdAt = Date.now();
    this.updatedAt = Date.now();
    this.version = 1;
  }
}
