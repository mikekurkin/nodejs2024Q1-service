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
    @InjectRepository(AlbumEntity)
    private albumsRepository: Repository<AlbumEntity>,
  ) {}

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

    this.albumsRepository.remove([album]);
  }
}
