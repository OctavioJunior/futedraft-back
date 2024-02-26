import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateUserDto } from 'src/dtos/createUser.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  createUser(@Body() body: CreateUserDto) {
    return this.usersService.create(body);
  }

  @Get()
  findAllUsers() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOneUser(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  updateOneUser(@Param('id') id: string, @Body() body: CreateUserDto) {
    return this.usersService.updateUser(id, body);
  }

  @Delete(':id')
  deleteOneUser(@Param('id') id: string) {
    return this.usersService.delete(id);
  }
}
