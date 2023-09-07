import { Injectable } from '@nestjs/common';

import { CreateUserDto } from '@users/dto/createUser.dto';

import { UserService } from '@common/services/external/user.service';

import { User } from '@users/types/users.type';

@Injectable()
export class UsersService {
  constructor(
    private readonly userService: UserService
  ) { }

  async createUser(userDto: CreateUserDto): Promise<User> {
    return this.userService.create(userDto);
  }

  async findOne(id: number): Promise<User> {
    return this.userService.findOne(id);
  }
}