import { randomUUID } from 'crypto';
import { Track } from './track.interface';

export class TrackEntity implements Track {
  readonly id: string; // uuid v4
  name: string;
  artistId: string | null; // refers to Artist
  albumId: string | null; // refers to Album
  duration: number; // integer number

  constructor(partial: Partial<TrackEntity>) {
    Object.assign(this, partial);
    if (this.id == undefined) this.id = randomUUID();
  }
}
