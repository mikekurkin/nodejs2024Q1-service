import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UUIDParam } from 'src/common/uuid';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: CreateAlbumDto) {
    return this.albumService.create(dto);
  }

  @Get()
  async findAll() {
    return this.albumService.findAll();
  }

  @Get(':id')
  async findOne(@Param() { id }: UUIDParam) {
    const album = await this.albumService.findOne(id);
    if (!album) throw new NotFoundException();
    return this.albumService.findOne(id);
  }

  @Put(':id')
  async update(@Param() { id }: UUIDParam, @Body() dto: UpdateAlbumDto) {
    const album = await this.albumService.update(id, dto);
    if (!album) throw new NotFoundException();
    return album;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param() { id }: UUIDParam) {
    await this.albumService.remove(id).catch(() => {
      throw new NotFoundException();
    });
  }
}
