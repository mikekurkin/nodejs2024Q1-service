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
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { TrackService } from './track.service';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: CreateTrackDto) {
    return this.trackService.create(dto);
  }

  @Get()
  async findAll() {
    return this.trackService.findAll();
  }

  @Get(':id')
  async findOne(@Param() { id }: UUIDParam) {
    const track = await this.trackService.findOne(id);
    if (!track) throw new NotFoundException();
    return this.trackService.findOne(id);
  }

  @Put(':id')
  async update(@Param() { id }: UUIDParam, @Body() dto: UpdateTrackDto) {
    const track = await this.trackService.update(id, dto);
    if (!track) throw new NotFoundException();
    return track;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param() { id }: UUIDParam) {
    await this.trackService.remove(id).catch(() => {
      throw new NotFoundException();
    });
  }
}
