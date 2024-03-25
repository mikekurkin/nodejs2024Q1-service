import { Injectable } from '@nestjs/common';
import { TrackService } from 'src/track/track.service';
import { AlbumEntity } from './album.entity';
import { Album } from './album.interface';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Injectable()
export class AlbumService {
  constructor(private readonly trackService: TrackService) {}
  private readonly albums: Album[] = [];

  async create(dto: CreateAlbumDto): Promise<Album> {
    const album = new AlbumEntity({ ...dto });
    this.albums.push(album);
    return await this.findOne(album.id);
  }

  async findAll(): Promise<Album[]> {
    return this.albums;
  }

  async findOne(id: string): Promise<Album> {
    return this.albums.find((album) => album.id == id) ?? null;
  }

  async update(id: string, dto: UpdateAlbumDto): Promise<Album> {
    const album = this.albums.find((album) => album.id == id);
    if (album) {
      Object.entries(dto).forEach(([key, value]) => (album[key] = value));
    }
    return album;
  }

  async remove(id: string): Promise<void> {
    const album = this.albums.find((album) => album.id == id);
    if (!album) return Promise.reject();
    (await this.trackService.findByAlbumId(id)).forEach(
      (track) => (track.albumId = null),
    );
    this.albums.splice(this.albums.indexOf(album), 1);
  }

  async findByArtistId(artistId: string): Promise<Album[]> {
    return this.albums.filter((album) => album.artistId == artistId);
  }

  async findByTrackId(trackId: string): Promise<Album> {
    const { albumId } = await this.trackService.findOne(trackId);
    return this.albums.find(async (album) => album.id == albumId);
  }
}
