import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UpdatePasswordDto {
  @ApiProperty()
  @IsNotEmpty()
  oldPassword: string; // previous password

  @ApiProperty()
  @IsNotEmpty()
  newPassword: string; // new password
}
