import { firstValueFrom, map } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { CreateUserDto } from '@users/dto/createUser.dto';

import { BaseService } from './base.service';

import { User } from '@users/types/users.type';

@Injectable()
export class UserService extends BaseService {
  constructor(
    private httpService: HttpService,
    protected readonly configService: ConfigService
  ) {
    super(configService, 'USERS');
  }

  async create(userDto: CreateUserDto): Promise<User> {
    return firstValueFrom(
      this.httpService
        .post(`${this.URL}/users`, userDto)
        .pipe(map(response => response.data))
    );
  }

  async findOne(id: number): Promise<User> {
    return firstValueFrom(
      this.httpService
        .get(`${this.configService.get<string>('USERS')}/users/${id}`)
        .pipe(map(response => response.data))
    );
  }
}