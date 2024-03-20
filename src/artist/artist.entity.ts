import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
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

  constructor(partial: Partial<ArtistEntity>) {
    Object.assign(this, partial);
  }
}
