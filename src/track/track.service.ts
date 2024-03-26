import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { AlbumEntity } from 'src/album/album.entity';
import { ArtistEntity } from 'src/artist/artist.entity';
import { DataSource, Equal } from 'typeorm';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { TrackEntity } from './track.entity';
import { Track } from './track.interface';

@Injectable()
export class TrackService {
  constructor(
    @InjectDataSource()
    private dataSource: DataSource,
  ) {}

  private tracksRepository = this.dataSource.getRepository(TrackEntity);
  private albumsRepository = this.dataSource.getRepository(AlbumEntity);
  private artistsRepository = this.dataSource.getRepository(ArtistEntity);

  async create(dto: CreateTrackDto): Promise<Track> {
    const album = await this.albumsRepository.findOneBy({
      id: Equal(dto.albumId),
    });
    const artist = await this.artistsRepository.findOneBy({
      id: Equal(dto.artistId),
    });
    const track = new TrackEntity({ ...dto, album, artist });
    await this.tracksRepository.save(track);
    return track;
  }

  async findAll(): Promise<Track[]> {
    return this.tracksRepository.find();
  }

  async findOne(id: string): Promise<Track> {
    return this.tracksRepository.findOneBy({ id });
  }

  async update(id: string, dto: UpdateTrackDto): Promise<Track> {
    const track = await this.tracksRepository.findOneBy({ id });
    if (track == null) return null;

    const album = await this.albumsRepository.findOneBy({
      id: Equal(dto.albumId),
    });
    const artist = await this.artistsRepository.findOneBy({
      id: Equal(dto.artistId),
    });
    const updatedTrack = new TrackEntity({ ...track, ...dto, album, artist });
    await this.tracksRepository.save(updatedTrack);
    return updatedTrack;
  }

  async remove(id: string): Promise<void> {
    const track = await this.tracksRepository.findOneBy({ id });
    if (!track) return Promise.reject();

    await this.tracksRepository.remove([track]);
  }
}
