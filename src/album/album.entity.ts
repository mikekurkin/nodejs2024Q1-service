import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { randomUUID } from 'crypto';
import { ArtistEntity } from 'src/artist/artist.entity';
import { TrackEntity } from 'src/track/track.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';
import { Album } from './album.interface';

@Entity()
export class AlbumEntity implements Album {
  @ApiProperty({ format: 'uuid' })
  @PrimaryGeneratedColumn('uuid')
  readonly id: string; // uuid v4
  @ApiProperty()
  @Column()
  name: string;
  @ApiProperty({ default: 2000 })
  @Column()
  year: number;
  @ApiPropertyOptional({ format: 'uuid' })
  @RelationId((album: AlbumEntity) => album.artist)
  artistId: string | null; // refers to Artist

  @Exclude()
  @ManyToOne(() => ArtistEntity, (artist) => artist.albums, {
    onDelete: 'SET NULL',
  })
  artist: ArtistEntity;
  @Exclude()
  @OneToMany(() => TrackEntity, (track) => track.album)
  tracks: TrackEntity[];

  constructor(partial: Partial<AlbumEntity>) {
    Object.assign(this, partial);
    if (this.id == undefined) this.id = randomUUID();
  }
}
