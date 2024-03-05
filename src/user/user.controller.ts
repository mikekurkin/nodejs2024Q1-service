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
import { UUIDParam } from '../common/uuid';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: CreateUserDto) {
    return this.userService.create(dto);
  }

  @Get()
  async findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param() { id }: UUIDParam) {
    const user = await this.userService.findOne(id);
    if (!user) throw new NotFoundException();
    return this.userService.findOne(id);
  }

  @Put(':id')
  async update(@Param() { id }: UUIDParam, @Body() dto: UpdatePasswordDto) {
    const user = await this.userService.updatePassword(id, dto).catch(() => {
      throw new ForbiddenException();
    });
    if (!user) throw new NotFoundException();
    return user;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param() { id }: UUIDParam) {
    await this.userService.remove(id).catch(() => {
      throw new NotFoundException();
    });
  }
}
