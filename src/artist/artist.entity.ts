import { randomUUID } from 'crypto';
import { AlbumEntity } from 'src/album/album.entity';
import { TrackEntity } from 'src/track/track.entity';
import { Artist } from './artist.interface';

export class ArtistEntity implements Artist {
  readonly id: string; // uuid v4
  name: string;
  grammy: boolean;

  tracks: TrackEntity[];
  albums: AlbumEntity[];

  constructor(partial: Partial<ArtistEntity>) {
    Object.assign(this, partial);
    if (this.id == undefined) this.id = randomUUID();
  }
}
