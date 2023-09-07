
import { HttpService } from '@nestjs/axios';

import { HttpException, Injectable, Logger } from '@nestjs/common';
import { catchError, firstValueFrom, map } from 'rxjs';
import { ConfigService } from '@nestjs/config';

import { LoginInputDto } from '@security/dto/login.dto';

import { BaseService } from './base.service';

@Injectable()
export class SSOService extends BaseService {
  private readonly logger: Logger = new Logger(SSOService.name);

  constructor(
    protected readonly configService: ConfigService,
    private httpService: HttpService
  ) {
    super(configService, 'SSO');
  }

  async login(loginDto: LoginInputDto): Promise<any> {
    return firstValueFrom(
      this.httpService.post(`${this.URL}/login`, loginDto).pipe(
        map(response => response.data)
      )
    );
  }

  async verifyToken(token: string): Promise<any> {
    return firstValueFrom(
      this.httpService.post(`${this.URL}/verify`, { token }).pipe(
        catchError(error => {
          throw new HttpException(error.response.data, error.response.status);
        }),
        map(response => response.data)
      )
    );
  }

  async refreshToken(token: string, session: Record<string, any>): Promise<any> {
    return firstValueFrom(
      this.httpService.post(`${this.URL}/refresh-token`, { token }).pipe(
        catchError(error => {
          session.destroy(() => {
            this.logger.log('Session destroyed.');
          });

          throw new HttpException(error.response.data, error.response.status);
        }),
        map(response => response.data)
      )
    );
  }
}
