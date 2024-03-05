import { IsInt, IsOptional, IsUUID } from 'class-validator';

export class UpdateTrackDto {
  @IsOptional()
  name: string;

  @IsOptional()
  @IsInt()
  duration: number;

  @IsOptional()
  @IsUUID()
  artistId: string;

  @IsOptional()
  @IsUUID()
  albumId: string;
}
