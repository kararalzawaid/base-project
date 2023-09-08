import { firstValueFrom, map } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { EmailDto } from '@security/dto/email.dto';
import { FilterDto } from '@common/dto/filter.dto';
import { CreateUserDto } from '@users/dto/createUser.dto';
import { ResetPasswordDto } from '@security/dto/reset-password.dto';

import { BaseService } from './base.service';

import { User } from '@users/types/users.type';
import { List } from '@common/types/list.type';

import { createQueryString } from '@common/utils/request';

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

  async getRecoveryHash(recoverPasswordDto: EmailDto): Promise<any> {
    return firstValueFrom(
      this.httpService
        .post(`${this.configService.get<string>('USERS')}/users/recover-password`, recoverPasswordDto)
        .pipe(
          map(response => response.data)
        )
    );
  }

  async resetPasswordVerify(token: string): Promise<any> {
    return firstValueFrom(
      this.httpService
        .get(`${this.configService.get<string>('USERS')}/users/verify-token/${token}`)
        .pipe(
          map(response => response.data)
        )
    );
  }

  async resetPassword(token: string, resetPasswordDto: ResetPasswordDto): Promise<any> {
    return firstValueFrom(
      this.httpService
        .put(`${this.configService.get<string>('USERS')}/users/reset-password?recoveryHash=${token}`, resetPasswordDto)
        .pipe(
          map(response => response.data)
        )
    );
  }

  async authentication(emailDto: EmailDto): Promise<void> {
    return firstValueFrom(
      this.httpService
        .post(`${this.configService.get<string>('USERS')}/users/authentication`, emailDto)
        .pipe(
          map(response => response.data)
        )
    );
  }
  
  async getAll(filterDto?: FilterDto): Promise<List> {
    const query = filterDto ? createQueryString(filterDto) : '';

    return firstValueFrom(
      this.httpService
        .get(`${this.configService.get<string>('USERS')}/users${query}`)
        .pipe(
          map(response => response.data)
        )
    );
  }

  async getList(filterDto: FilterDto): Promise<User> {
    const query = createQueryString(filterDto);

    return firstValueFrom(
      this.httpService
        .get(`${this.configService.get<string>('USERS')}/users/list${query}`)
        .pipe(
          map(response => response.data)
        )
    );
  }

  async remove(id: number): Promise<void> {
    return firstValueFrom(
      this.httpService
        .delete(`${this.configService.get<string>('USERS')}/users/${id}`)
        .pipe(
          map(response => response.data)
        )
    );
  }
}