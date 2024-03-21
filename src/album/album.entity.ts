import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { randomUUID } from 'crypto';
import { ArtistEntity } from 'src/artist/artist.entity';
import {
  Column,
  Entity,
  ManyToOne,
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
  @ManyToOne(() => ArtistEntity, (artist) => artist.albums)
  artist: ArtistEntity;

  constructor(partial: Partial<AlbumEntity>) {
    Object.assign(this, partial);
    if (this.id == undefined) this.id = randomUUID();
  }
}
