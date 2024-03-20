import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AlbumService } from 'src/album/album.service';
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
    private readonly trackService: TrackService,
    private readonly albumService: AlbumService,
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
    if (artist) {
      Object.entries(dto).forEach(([key, value]) => (artist[key] = value));
      const updatedArtist = { ...artist, ...dto };
      await this.artistsRepository.save(updatedArtist);
    }
    return artist;
  }

  async remove(id: string): Promise<void> {
    const artist = await this.artistsRepository.findOneBy({ id });
    if (!artist) return Promise.reject();

    (await this.trackService.findByArtistId(id)).forEach(
      (track) => (track.artistId = null),
    );
    (await this.albumService.findByArtistId(id)).forEach(
      (album) => (album.artistId = null),
    );
    this.artistsRepository.remove([artist]);
  }

  // async findByTrackId(trackId: string): Promise<Artist> {
  //   const { artistId } = await this.trackService.findOne(trackId);
  //   return this.artists.find(async (artist) => artist.id == artistId);
  // }

  // async findByAlbumId(trackId: string): Promise<Artist> {
  //   const { artistId } = await this.trackService.findOne(trackId);
  //   return this.artists.find(async (artist) => artist.id == artistId);
  // }
}
