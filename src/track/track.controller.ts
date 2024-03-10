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
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { UUIDParam } from 'src/common/uuid';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { TrackEntity } from './track.entity';
import { TrackService } from './track.service';

@ApiTags('Track')
@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({ type: TrackEntity })
  @ApiBadRequestResponse({
    description: 'Bad request: body does not contain required fields',
  })
  async create(@Body() dto: CreateTrackDto) {
    return this.trackService.create(dto);
  }

  @Get()
  @ApiOkResponse({ type: [TrackEntity] })
  async findAll() {
    return this.trackService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: TrackEntity })
  @ApiBadRequestResponse({
    description: 'Bad request: trackId is invalid (not uuid)',
  })
  @ApiNotFoundResponse({ description: 'Track not found' })
  @ApiParam({ name: 'id', type: 'string', format: 'uuid' })
  async findOne(@Param() { id }: UUIDParam) {
    const track = await this.trackService.findOne(id);
    if (!track) throw new NotFoundException();
    return this.trackService.findOne(id);
  }

  @Put(':id')
  @ApiOkResponse({ type: TrackEntity })
  @ApiBadRequestResponse({
    description: 'Bad request: trackId is invalid (not uuid)',
  })
  @ApiNotFoundResponse({ description: 'Track not found' })
  @ApiParam({ name: 'id', type: 'string', format: 'uuid' })
  async update(@Param() { id }: UUIDParam, @Body() dto: UpdateTrackDto) {
    const track = await this.trackService.update(id, dto);
    if (!track) throw new NotFoundException();
    return track;
  }

  @Delete(':id')
  @ApiNoContentResponse({ description: 'The track has been deleted' })
  @ApiBadRequestResponse({
    description: 'Bad request: trackId is invalid (not uuid)',
  })
  @ApiNotFoundResponse({ description: 'Track not found' })
  @ApiParam({ name: 'id', type: 'string', format: 'uuid' })
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param() { id }: UUIDParam) {
    await this.trackService.remove(id).catch(() => {
      throw new NotFoundException();
    });
  }
}
