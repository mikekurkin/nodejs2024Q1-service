import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { randomUUID } from 'crypto';
import { Album } from './album.interface';

export class AlbumEntity implements Album {
  @ApiProperty({ format: 'uuid' })
  readonly id: string; // uuid v4
  @ApiProperty()
  name: string;
  @ApiProperty({ default: 2000 })
  year: number;
  @ApiPropertyOptional({ format: 'uuid' })
  artistId: string | null; // refers to Artist

  constructor(partial: Partial<AlbumEntity>) {
    Object.assign(this, partial);
    if (this.id == undefined) this.id = randomUUID();
  }
}
