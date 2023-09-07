
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class BaseService {
  protected readonly URL: string;

  constructor(
    protected readonly configService: ConfigService,
    private readonly SERVICE_URL: string
  ) {
    this.URL = this.configService.get<string>(this.SERVICE_URL);
  }
}
