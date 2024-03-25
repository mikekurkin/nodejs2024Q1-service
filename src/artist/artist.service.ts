import { Injectable } from '@nestjs/common';
import { AlbumService } from 'src/album/album.service';
import { TrackService } from 'src/track/track.service';
import { ArtistEntity } from './artist.entity';
import { Artist } from './artist.interface';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Injectable()
export class ArtistService {
  constructor(
    private readonly trackService: TrackService,
    private readonly albumService: AlbumService,
  ) {}

  private readonly artists: Artist[] = [];

  async create(dto: CreateArtistDto): Promise<Artist> {
    const artist = new ArtistEntity({ ...dto });
    this.artists.push(artist);
    return await this.findOne(artist.id);
  }

  async findAll(): Promise<Artist[]> {
    return this.artists;
  }

  async findOne(id: string): Promise<Artist> {
    return this.artists.find((artist) => artist.id == id) ?? null;
  }

  async update(id: string, dto: UpdateArtistDto): Promise<Artist> {
    const artist = this.artists.find((artist) => artist.id == id);
    if (artist) {
      Object.entries(dto).forEach(([key, value]) => (artist[key] = value));
    }
    return artist;
  }

  async remove(id: string): Promise<void> {
    const artist = this.artists.find((artist) => artist.id == id);
    if (!artist) return Promise.reject();
    (await this.trackService.findByArtistId(id)).forEach(
      (track) => (track.artistId = null),
    );
    (await this.albumService.findByArtistId(id)).forEach(
      (album) => (album.artistId = null),
    );
    this.artists.splice(this.artists.indexOf(artist), 1);
  }

  async findByTrackId(trackId: string): Promise<Artist> {
    const { artistId } = await this.trackService.findOne(trackId);
    return this.artists.find(async (artist) => artist.id == artistId);
  }

  async findByAlbumId(trackId: string): Promise<Artist> {
    const { artistId } = await this.trackService.findOne(trackId);
    return this.artists.find(async (artist) => artist.id == artistId);
  }
}
