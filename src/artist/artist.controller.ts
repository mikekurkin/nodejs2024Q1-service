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
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: CreateArtistDto) {
    return this.artistService.create(dto);
  }

  @Get()
  async findAll() {
    return this.artistService.findAll();
  }

  @Get(':id')
  async findOne(@Param() { id }: UUIDParam) {
    const artist = await this.artistService.findOne(id);
    if (!artist) throw new NotFoundException();
    return this.artistService.findOne(id);
  }

  @Put(':id')
  async update(@Param() { id }: UUIDParam, @Body() dto: UpdateArtistDto) {
    const artist = await this.artistService.update(id, dto);
    if (!artist) throw new NotFoundException();
    return artist;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param() { id }: UUIDParam) {
    await this.artistService.remove(id).catch(() => {
      throw new NotFoundException();
    });
  }
}
