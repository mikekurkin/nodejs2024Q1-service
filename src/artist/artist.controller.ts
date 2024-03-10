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
import { ArtistEntity } from './artist.entity';
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@ApiTags('Artist')
@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({ type: ArtistEntity })
  @ApiBadRequestResponse({
    description: 'Bad request: body does not contain required fields',
  })
  async create(@Body() dto: CreateArtistDto) {
    return this.artistService.create(dto);
  }

  @Get()
  @ApiOkResponse({ type: [ArtistEntity] })
  async findAll() {
    return this.artistService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: ArtistEntity })
  @ApiBadRequestResponse({
    description: 'Bad request: artistId is invalid (not uuid)',
  })
  @ApiNotFoundResponse({ description: 'Artist not found' })
  @ApiParam({ name: 'id', type: 'string', format: 'uuid' })
  async findOne(@Param() { id }: UUIDParam) {
    const artist = await this.artistService.findOne(id);
    if (!artist) throw new NotFoundException();
    return this.artistService.findOne(id);
  }

  @Put(':id')
  @ApiOkResponse({ type: ArtistEntity })
  @ApiBadRequestResponse({
    description: 'Bad request: artistId is invalid (not uuid)',
  })
  @ApiNotFoundResponse({ description: 'Artist not found' })
  @ApiParam({ name: 'id', type: 'string', format: 'uuid' })
  async update(@Param() { id }: UUIDParam, @Body() dto: UpdateArtistDto) {
    const artist = await this.artistService.update(id, dto);
    if (!artist) throw new NotFoundException();
    return artist;
  }

  @Delete(':id')
  @ApiNoContentResponse({ description: 'The artist has been deleted' })
  @ApiBadRequestResponse({
    description: 'Bad request: artistId is invalid (not uuid)',
  })
  @ApiNotFoundResponse({ description: 'Artist not found' })
  @ApiParam({ name: 'id', type: 'string', format: 'uuid' })
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param() { id }: UUIDParam) {
    await this.artistService.remove(id).catch(() => {
      throw new NotFoundException();
    });
  }
}
