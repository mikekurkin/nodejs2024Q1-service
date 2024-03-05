import { IsInt, IsOptional, IsUUID } from 'class-validator';

export class UpdateAlbumDto {
  @IsOptional()
  name: string;

  @IsOptional()
  @IsInt()
  year: number;

  @IsOptional()
  @IsUUID()
  artistId: string;
}
