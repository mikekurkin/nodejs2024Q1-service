import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { AlbumEntity } from '../album/album.entity';
import { TrackEntity } from '../track/track.entity';
import { Artist } from './artist.interface';

@Entity()
export class ArtistEntity implements Artist {
  @ApiProperty({ format: 'uuid' })
  @PrimaryGeneratedColumn('uuid')
  readonly id: string; // uuid v4
  @ApiProperty()
  @Column()
  name: string;
  @ApiProperty()
  @Column()
  grammy: boolean;

  @Exclude()
  @OneToMany(() => AlbumEntity, (album) => album.artist)
  albums: AlbumEntity[];
  @Exclude()
  @OneToMany(() => TrackEntity, (track) => track.artist)
  tracks: TrackEntity[];

  constructor(partial: Partial<ArtistEntity>) {
    Object.assign(this, partial);
  }
}
