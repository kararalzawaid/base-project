import { ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  Controller,
  Body,
  Post,
  Get,
  Param,
  UseInterceptors
} from '@nestjs/common';

import { HttpErrorHandlerInterceptor } from '@common/interceptors/http-error-handler';

import { CreateUserDto } from '@users/dto/createUser.dto';
import { UsersService } from '@users/users.service';

import { User } from '@users/types/users.type';

import { Public } from '@security/decorators/public.decorator';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly userService: UsersService
  ) { }

  @Post('/create')
  @Public()
  @UseInterceptors(HttpErrorHandlerInterceptor)
  @ApiOperation({ summary: 'Register' })
  async createUser(@Body() userDto: CreateUserDto): Promise<User> {
    return this.userService.createUser(userDto);
  }

  @Get('/:id')
  @UseInterceptors(HttpErrorHandlerInterceptor)
  @ApiOperation({ summary: 'Returns user by id' })
  async findOne(@Param('id') id: number): Promise<User> {
    return this.userService.findOne(id);
  }
}
