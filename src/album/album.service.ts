import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { ArtistEntity } from 'src/artist/artist.entity';
import { DataSource, Equal } from 'typeorm';
import { AlbumEntity } from './album.entity';
import { Album } from './album.interface';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Injectable()
export class AlbumService {
  constructor(
    @InjectDataSource()
    private dataSource: DataSource,
  ) {}

  private albumsRepository = this.dataSource.getRepository(AlbumEntity);
  private artistsRepository = this.dataSource.getRepository(ArtistEntity);

  async create(dto: CreateAlbumDto): Promise<Album> {
    const artist = await this.artistsRepository.findOneBy({
      id: Equal(dto.artistId),
    });
    const album = new AlbumEntity({ ...dto, artist });
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

    const artist = await this.artistsRepository.findOneBy({
      id: Equal(dto.artistId),
    });
    const updatedAlbum = new AlbumEntity({ ...album, ...dto, artist });
    await this.albumsRepository.save(updatedAlbum);
    return updatedAlbum;
  }

  async remove(id: string): Promise<void> {
    const album = await this.albumsRepository.findOneBy({ id });
    if (album == null) return Promise.reject();

    this.albumsRepository.remove([album]);
  }
}
