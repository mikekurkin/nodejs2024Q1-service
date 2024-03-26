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
import { AlbumEntity } from './album.entity';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { AlbumService } from './album.service';

@ApiTags('Album')
@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({ type: AlbumEntity })
  @ApiBadRequestResponse({
    description: 'Bad request: body does not contain required fields',
  })
  async create(@Body() dto: CreateAlbumDto) {
    return this.albumService.create(dto);
  }

  @Get()
  @ApiOkResponse({ type: [AlbumEntity] })
  async findAll() {
    return this.albumService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: AlbumEntity })
  @ApiBadRequestResponse({
    description: 'Bad request: albumId is invalid (not uuid)',
  })
  @ApiNotFoundResponse({ description: 'Album not found' })
  @ApiParam({ name: 'id', type: 'string', format: 'uuid' })
  async findOne(@Param() { id }: UUIDParam) {
    const album = await this.albumService.findOne(id);
    if (!album) throw new NotFoundException();
    return this.albumService.findOne(id);
  }

  @Put(':id')
  @ApiOkResponse({ type: AlbumEntity })
  @ApiBadRequestResponse({
    description: 'Bad request: albumId is invalid (not uuid)',
  })
  @ApiNotFoundResponse({ description: 'Album not found' })
  @ApiParam({ name: 'id', type: 'string', format: 'uuid' })
  async update(@Param() { id }: UUIDParam, @Body() dto: UpdateAlbumDto) {
    const album = await this.albumService.update(id, dto);
    if (!album) throw new NotFoundException();
    return album;
  }

  @Delete(':id')
  @ApiNoContentResponse({ description: 'The album has been deleted' })
  @ApiBadRequestResponse({
    description: 'Bad request: albumId is invalid (not uuid)',
  })
  @ApiNotFoundResponse({ description: 'Album not found' })
  @ApiParam({ name: 'id', type: 'string', format: 'uuid' })
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param() { id }: UUIDParam) {
    await this.albumService.remove(id).catch(() => {
      throw new NotFoundException();
    });
  }
}
