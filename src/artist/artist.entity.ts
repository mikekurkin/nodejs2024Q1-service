import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { AlbumEntity } from 'src/album/album.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
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

  constructor(partial: Partial<ArtistEntity>) {
    Object.assign(this, partial);
  }
}
