import { ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  Controller,
  Body,
  Post,
  Get,
  Param,
  Delete,
  UseInterceptors,
  Query,
  Put
} from '@nestjs/common';
import { ApiImplicitQueries } from 'nestjs-swagger-api-implicit-queries-decorator';

import { HttpErrorHandlerInterceptor } from '@common/interceptors/http-error-handler';

import { CreateUserDto } from '@users/dto/createUser.dto';

import { UsersService } from '@users/users.service';

import { User } from '@users/types/users.type';
import { List } from '@common/types/list.type';

import { Public } from '@security/decorators/public.decorator';

import { FilterUsersDto } from './dto/filter.dto';
import { SimpleLoginDto } from '@security/dto/simple-login.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly userService: UsersService
  ) { }

  @Post('/auth')
  @Public()
  @UseInterceptors(HttpErrorHandlerInterceptor)
  @ApiOperation({ summary: 'Return OK if email exist' })
  async authentication(@Body() emailDto: SimpleLoginDto): Promise<void> {
    return this.userService.authentication(emailDto);
  }

  @Post('/create')
  @Public()
  @UseInterceptors(HttpErrorHandlerInterceptor)
  @ApiOperation({ summary: 'Register' })
  async createUser(@Body() userDto: CreateUserDto): Promise<User> {
    return this.userService.createUser(userDto);
  }

  @Get('/list')
  @ApiImplicitQueries([
    { name: 'search', description: 'Search by email or first name or last name', required: false, type: 'string' },
    { name: 'users', description: 'Search after array of users data', required: false },
    { name: 'page', description: 'Current page', required: false },
    { name: 'limit', description: 'Number of items per page', required: false },
    { name: 'sort', description: 'Sort users', required: false },
    { name: 'sortOrder', description: 'Sort users by order ASC or DESC', required: false }
  ])
  @ApiOperation({ summary: 'Return users' })
  async findList(@Query() filterDto: FilterUsersDto): Promise<User> {
    return this.userService.getList(filterDto);
  }

  @Get('/:id')
  @UseInterceptors(HttpErrorHandlerInterceptor)
  @ApiOperation({ summary: 'Returns user by id' })
  async findOne(@Param('id') id: number): Promise<User> {
    return this.userService.findOne(id);
  }

  @Get('/')
  @ApiImplicitQueries([
    { name: 'search', description: 'Search by email or first name or last name', required: false, type: 'string' },
    { name: 'users', description: 'Search after array of users data', required: false },
    { name: 'page', description: 'Current page', required: false },
    { name: 'limit', description: 'Number of items per page', required: false },
    { name: 'sort', description: 'Sort users', required: false },
    { name: 'sortOrder', description: 'Sort users by order ASC or DESC', required: false }
  ])
  @ApiOperation({ summary: 'Return users' })
  async findAll(@Query() filterDto: FilterUsersDto): Promise<List> {
    console.log('888')
    return this.userService.getAll(filterDto);
  }

  @Delete('/:id')
  @UseInterceptors(HttpErrorHandlerInterceptor)
  @ApiOperation({ summary: 'Removes user by id' })
  async remove(@Param('id') id: number): Promise<void> {
    this.userService.remove(id);
  }
}
