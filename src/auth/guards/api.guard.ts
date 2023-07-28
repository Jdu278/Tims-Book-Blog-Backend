import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  Inject,
} from '@nestjs/common';
import config from '../../config';
import { ConfigType } from '@nestjs/config';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(
    @Inject(config.KEY)
    private configService: ConfigType<typeof config>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const apiKey = request.headers['authorization'].split(' ')[1];

    if (!apiKey) {
      throw new UnauthorizedException('API key is missing.');
    }
    if (apiKey !== this.configService.apiKey) {
      throw new UnauthorizedException('Invalid API key.');
    }

    return true;
  }
}
