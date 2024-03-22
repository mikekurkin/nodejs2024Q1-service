import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AlbumEntity } from 'src/album/album.entity';
import { TrackService } from 'src/track/track.service';
import { Repository } from 'typeorm';
import { ArtistEntity } from './artist.entity';
import { Artist } from './artist.interface';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(ArtistEntity)
    private artistsRepository: Repository<ArtistEntity>,
  ) {}

  async create(dto: CreateArtistDto): Promise<Artist> {
    const artist = new ArtistEntity({ ...dto });
    await this.artistsRepository.save(artist);
    return artist;
  }

  async findAll(): Promise<Artist[]> {
    return this.artistsRepository.find();
  }

  async findOne(id: string): Promise<Artist> {
    return this.artistsRepository.findOneBy({ id });
  }

  async update(id: string, dto: UpdateArtistDto): Promise<Artist> {
    const artist = await this.artistsRepository.findOneBy({ id });
    if (artist == null) return null;

    const updatedArtist = { ...artist, ...dto };
    await this.artistsRepository.save(updatedArtist);
    return updatedArtist;
  }

  async remove(id: string): Promise<void> {
    const artist = await this.artistsRepository.findOneBy({ id });
    if (!artist) return Promise.reject();

    this.artistsRepository.remove([artist]);
  }
}
