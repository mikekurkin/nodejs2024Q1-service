import { IsInt, IsNotEmpty, IsOptional, IsUUID } from 'class-validator';

export class CreateTrackDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsInt()
  duration: number;

  @IsOptional()
  @IsUUID()
  artistId: string;

  @IsOptional()
  @IsUUID()
  albumId: string;
}
