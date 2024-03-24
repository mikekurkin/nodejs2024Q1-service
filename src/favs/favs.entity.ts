import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { AlbumEntity } from '../album/album.entity';
import { ArtistEntity } from '../artist/artist.entity';
import { TrackEntity } from '../track/track.entity';

export const Entities = {
  artist: ArtistEntity,
  album: AlbumEntity,
  track: TrackEntity,
} as const;
export type EntityType = 'artists' | 'albums' | 'tracks';

@Entity()
export class FavoriteEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  entityType: EntityType;

  @Column({ type: 'uuid' })
  entityId: string;

  constructor(partial: Partial<FavoriteEntity>) {
    Object.assign(this, partial);
  }
}
