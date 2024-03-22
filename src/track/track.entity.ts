import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { AlbumEntity } from 'src/album/album.entity';
import { ArtistEntity } from 'src/artist/artist.entity';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';
import { Track } from './track.interface';

@Entity()
export class TrackEntity implements Track {
  @ApiProperty({ format: 'uuid' })
  @PrimaryGeneratedColumn('uuid')
  readonly id: string; // uuid v4
  @ApiProperty()
  @Column()
  name: string;
  @ApiPropertyOptional({ format: 'uuid' })
  @RelationId((track: TrackEntity) => track.artist)
  artistId: string | null; // refers to Artist
  @ApiPropertyOptional({ format: 'uuid' })
  @RelationId((track: TrackEntity) => track.album)
  albumId: string | null; // refers to Album
  @ApiProperty({ default: 180 })
  @Column()
  duration: number; // integer number

  @Exclude()
  @ManyToOne(() => ArtistEntity, (artist) => artist.tracks, {
    onDelete: 'SET NULL',
  })
  artist: ArtistEntity;
  @Exclude()
  @ManyToOne(() => AlbumEntity, (album) => album.tracks, {
    onDelete: 'SET NULL',
  })
  album: AlbumEntity;

  constructor(partial: Partial<TrackEntity>) {
    Object.assign(this, partial);
  }
}
