import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { randomUUID } from 'crypto';
import { Track } from './track.interface';

export class TrackEntity implements Track {
  @ApiProperty({ format: 'uuid' })
  readonly id: string; // uuid v4
  @ApiProperty()
  name: string;
  @ApiPropertyOptional({ format: 'uuid' })
  artistId: string | null; // refers to Artist
  @ApiPropertyOptional({ format: 'uuid' })
  albumId: string | null; // refers to Album
  @ApiProperty({ default: 180 })
  duration: number; // integer number

  constructor(partial: Partial<TrackEntity>) {
    Object.assign(this, partial);
    if (this.id == undefined) this.id = randomUUID();
  }
}
