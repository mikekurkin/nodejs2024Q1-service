import { ApiProperty } from '@nestjs/swagger';
import { randomUUID } from 'crypto';
import { Artist } from './artist.interface';

export class ArtistEntity implements Artist {
  @ApiProperty({ format: 'uuid' })
  readonly id: string; // uuid v4
  @ApiProperty()
  name: string;
  @ApiProperty()
  grammy: boolean;

  constructor(partial: Partial<ArtistEntity>) {
    Object.assign(this, partial);
    if (this.id == undefined) this.id = randomUUID();
  }
}
