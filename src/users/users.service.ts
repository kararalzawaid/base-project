import { Injectable } from '@nestjs/common';

import { CreateUserDto } from '@users/dto/createUser.dto';
import { EmailDto } from '@security/dto/email.dto';

import { UserService } from '@common/services/external/user.service';

import { User } from '@users/types/users.type';
import { FilterDto } from '@common/dto/filter.dto';
import { List } from '@common/types/list.type';

@Injectable()
export class UsersService {
  constructor(
    private readonly userService: UserService
  ) { }

  async authentication(emailDto: EmailDto): Promise<void> {
    return this.userService.authentication(emailDto);
  }

  async createUser(userDto: CreateUserDto): Promise<User> {
    return this.userService.create(userDto);
  }

  async findOne(id: number): Promise<User> {
    return this.userService.findOne(id);
  }

  async getAll(filterDto: FilterDto): Promise<List> {
    return this.userService.getAll(filterDto);
  }

  async getList(filterDto: FilterDto): Promise<User> {
    const { sortOrder = '', sort = '' } = filterDto;

    if (!sortOrder.length && !sort.length || sort === 'undefined' && sortOrder === 'undefined') {
      delete filterDto.sort;
      delete filterDto.sortOrder;
    }

    return this.userService.getList(filterDto);
  }

  async remove(id: number): Promise<void> {
    this.userService.remove(id);
  }
}