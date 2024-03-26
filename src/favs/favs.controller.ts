import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  UnprocessableEntityException,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { UUIDParam } from 'src/common/uuid';
import { FavoritesResponse } from './favs.interface';
import { FavsService } from './favs.service';

@ApiTags('Favorites')
@Controller('favs')
export class FavsController {
  constructor(private readonly favsService: FavsService) {}

  @Get()
  @ApiOkResponse({ type: FavoritesResponse })
  async findAll() {
    return this.favsService.getFavs();
  }

  @Post('track/:id')
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({ description: 'Track added to favorites successfully' })
  @ApiUnprocessableEntityResponse({
    description: 'Unprocessable entry: Track does not exist',
  })
  @ApiBadRequestResponse({
    description: 'Bad request: trackId is invalid (not uuid)',
  })
  @ApiParam({ name: 'id', type: 'string', format: 'uuid' })
  async addTrack(@Param() { id }: UUIDParam) {
    await this.favsService.addEntity(id, 'tracks').catch(() => {
      throw new UnprocessableEntityException(
        'Unprocessable entry: Track does not exist',
      );
    });
    return { message: 'Track added to favorites successfully' };
  }

  @Delete('track/:id')
  @ApiNoContentResponse({ description: 'The track has been deleted' })
  @ApiBadRequestResponse({
    description: 'Bad request: trackId is invalid (not uuid)',
  })
  @ApiNotFoundResponse({ description: 'Track not found' })
  @ApiParam({ name: 'id', type: 'string', format: 'uuid' })
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeTrack(@Param() { id }: UUIDParam) {
    await this.favsService.removeEntity(id, 'tracks').catch(() => {
      throw new NotFoundException();
    });
  }

  @Post('album/:id')
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({ description: 'Album added to favorites successfully' })
  @ApiUnprocessableEntityResponse({
    description: 'Unprocessable entry: Album does not exist',
  })
  @ApiBadRequestResponse({
    description: 'Bad request: albumId is invalid (not uuid)',
  })
  @ApiParam({ name: 'id', type: 'string', format: 'uuid' })
  async addAlbum(@Param() { id }: UUIDParam) {
    await this.favsService.addEntity(id, 'albums').catch(() => {
      throw new UnprocessableEntityException(
        'Unprocessable entry: Album does not exist',
      );
    });
    return { message: 'Album added to favorites successfully' };
  }

  @Delete('album/:id')
  @ApiNoContentResponse({ description: 'The album has been deleted' })
  @ApiBadRequestResponse({
    description: 'Bad request: albumId is invalid (not uuid)',
  })
  @ApiNotFoundResponse({ description: 'Album not found' })
  @ApiParam({ name: 'id', type: 'string', format: 'uuid' })
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeAlbum(@Param() { id }: UUIDParam) {
    await this.favsService.removeEntity(id, 'albums').catch(() => {
      throw new NotFoundException();
    });
  }

  @Post('artist/:id')
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({
    description: 'Artist added to favorites successfully',
  })
  @ApiUnprocessableEntityResponse({
    description: 'Unprocessable entry: Artist does not exist',
  })
  @ApiBadRequestResponse({
    description: 'Bad request: artistId is invalid (not uuid)',
  })
  @ApiParam({ name: 'id', type: 'string', format: 'uuid' })
  async addArtist(@Param() { id }: UUIDParam) {
    await this.favsService.addEntity(id, 'artists').catch(() => {
      throw new UnprocessableEntityException(
        'Unprocessable entry: Artist does not exist',
      );
    });
    return { message: 'Artist added to favorites successfully' };
  }

  @Delete('artist/:id')
  @ApiNoContentResponse({ description: 'The artist has been deleted' })
  @ApiBadRequestResponse({
    description: 'Bad request: artistId is invalid (not uuid)',
  })
  @ApiNotFoundResponse({ description: 'Artist not found' })
  @ApiParam({ name: 'id', type: 'string', format: 'uuid' })
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeArtist(@Param() { id }: UUIDParam) {
    await this.favsService.removeEntity(id, 'artists').catch(() => {
      throw new NotFoundException();
    });
  }
}
