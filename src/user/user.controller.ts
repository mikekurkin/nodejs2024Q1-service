import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
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
  ApiForbiddenResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { UUIDParam } from '../common/uuid';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({ type: UserEntity })
  @ApiBadRequestResponse({
    description: 'Bad request: body does not contain required fields',
  })
  async create(@Body() dto: CreateUserDto) {
    return this.userService.create(dto);
  }

  @Get()
  @ApiOkResponse({ type: [UserEntity] })
  async findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: UserEntity })
  @ApiBadRequestResponse({
    description: 'Bad request: userId is invalid (not uuid)',
  })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiParam({ name: 'id', type: 'string', format: 'uuid' })
  async findOne(@Param() { id }: UUIDParam) {
    const user = await this.userService.findOne(id);
    if (!user) throw new NotFoundException();
    return this.userService.findOne(id);
  }

  @Put(':id')
  @ApiOkResponse({ type: UserEntity })
  @ApiBadRequestResponse({
    description: 'Bad request: userId is invalid (not uuid)',
  })
  @ApiForbiddenResponse({ description: 'Password does not match' })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiParam({ name: 'id', type: 'string', format: 'uuid' })
  async update(@Param() { id }: UUIDParam, @Body() dto: UpdatePasswordDto) {
    const user = await this.userService.updatePassword(id, dto).catch(() => {
      throw new ForbiddenException();
    });
    if (!user) throw new NotFoundException();
    return user;
  }

  @Delete(':id')
  @ApiNoContentResponse({ description: 'The user has been deleted' })
  @ApiBadRequestResponse({
    description: 'Bad request: userId is invalid (not uuid)',
  })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiParam({ name: 'id', type: 'string', format: 'uuid' })
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param() { id }: UUIDParam) {
    await this.userService.remove(id).catch(() => {
      throw new NotFoundException();
    });
  }
}
