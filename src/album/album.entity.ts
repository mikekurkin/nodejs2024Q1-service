import { randomUUID } from 'crypto';
import { Album } from './album.interface';

export class AlbumEntity implements Album {
  readonly id: string; // uuid v4
  name: string;
  year: number;
  artistId: string | null; // refers to Artist

  constructor(partial: Partial<AlbumEntity>) {
    Object.assign(this, partial);
    if (this.id == undefined) this.id = randomUUID();
  }
}
