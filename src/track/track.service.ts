import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { TrackEntity } from './track.entity';
import { Track } from './track.interface';

@Injectable()
export class TrackService {
  private readonly tracks: Track[] = [];

  async create(dto: CreateTrackDto): Promise<Track> {
    const track = new TrackEntity({ ...dto });
    this.tracks.push(track);
    return await this.findOne(track.id);
  }

  async findAll(): Promise<Track[]> {
    return this.tracks;
  }

  async findOne(id: string): Promise<Track> {
    return this.tracks.find((track) => track.id == id) ?? null;
  }

  async update(id: string, dto: UpdateTrackDto): Promise<Track> {
    const track = this.tracks.find((track) => track.id == id);
    if (track) {
      Object.entries(dto).forEach(([key, value]) => (track[key] = value));
    }
    return track;
  }

  async remove(id: string): Promise<void> {
    const track = this.tracks.find((track) => track.id == id);
    if (!track) return Promise.reject();
    this.tracks.splice(this.tracks.indexOf(track), 1);
  }

  async findByArtistId(artistId: string): Promise<Track[]> {
    return this.tracks.filter((track) => track.artistId == artistId);
  }

  async findByAlbumId(albumId: string): Promise<Track[]> {
    return this.tracks.filter((track) => track.albumId == albumId);
  }
}
