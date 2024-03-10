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
  UnprocessableEntityException,
} from '@nestjs/common';
import { UUIDParam } from 'src/common/uuid';
import { FavsService } from './favs.service';

@Controller('favs')
export class FavsController {
  constructor(private readonly favsService: FavsService) {}
  @Get()
  async findAll() {
    return this.favsService.getFavs();
  }

  @Post('track/:id')
  async addTrack(@Param() { id }: UUIDParam) {
    await this.favsService.addTrack(id).catch(() => {
      throw new UnprocessableEntityException();
    });
  }

  @Delete('track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeTrack(@Param() { id }: UUIDParam) {
    await this.favsService.removeTrack(id).catch(() => {
      throw new NotFoundException();
    });
  }

  @Post('album/:id')
  async addAlbum(@Param() { id }: UUIDParam) {
    await this.favsService.addAlbum(id).catch(() => {
      throw new UnprocessableEntityException();
    });
  }

  @Delete('album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeAlbum(@Param() { id }: UUIDParam) {
    await this.favsService.removeAlbum(id).catch(() => {
      throw new NotFoundException();
    });
  }

  @Post('artist/:id')
  async addArtist(@Param() { id }: UUIDParam) {
    await this.favsService.addArtist(id).catch(() => {
      throw new UnprocessableEntityException();
    });
  }

  @Delete('artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeArtist(@Param() { id }: UUIDParam) {
    await this.favsService.removeArtist(id).catch(() => {
      throw new NotFoundException();
    });
  }
}
