import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TrackService } from 'src/track/track.service';
import { Repository } from 'typeorm';
import { AlbumEntity } from './album.entity';
import { Album } from './album.interface';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Injectable()
export class AlbumService {
  constructor(
    private readonly trackService: TrackService,
    @InjectRepository(AlbumEntity)
    private albumsRepository: Repository<AlbumEntity>,
  ) {}
  // private readonly albums: Album[] = [];

  async create(dto: CreateAlbumDto): Promise<Album> {
    const album = new AlbumEntity({ ...dto });
    await this.albumsRepository.save(album);
    return album;
  }

  async findAll(): Promise<Album[]> {
    return this.albumsRepository.find();
  }

  async findOne(id: string): Promise<Album> {
    return this.albumsRepository.findOneBy({ id });
  }

  async update(id: string, dto: UpdateAlbumDto): Promise<Album> {
    const album = await this.albumsRepository.findOneBy({ id });
    if (album == null) return null;

    const updatedAlbum = { ...album, ...dto };
    await this.albumsRepository.save(updatedAlbum);
    return updatedAlbum;
  }

  async remove(id: string): Promise<void> {
    const album = await this.albumsRepository.findOneBy({ id });
    if (album == null) return Promise.reject();
    (await this.trackService.findByAlbumId(id)).forEach(
      (track) => (track.albumId = null),
    );
    this.albumsRepository.remove([album]);
  }

  // async findByArtistId(artistId: string): Promise<Album[]> {
  //   return this.albums.filter((album) => album.artistId == artistId);
  // }

  // async findByTrackId(trackId: string): Promise<Album> {
  //   const { albumId } = await this.trackService.findOne(trackId);
  //   return this.albums.find(async (album) => album.id == albumId);
  // }
}
