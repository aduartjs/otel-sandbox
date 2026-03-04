import { Controller, Get, Param } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { AppService } from './app.service';

const WEATHER_SERVICE_URL = process.env.WEATHER_SERVICE_URL || 'http://weather-service:3001';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly httpService: HttpService,
  ) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('weather')
  async getWeather() {
    const { data } = await firstValueFrom(
      this.httpService.get(`${WEATHER_SERVICE_URL}/weather`),
    );
    return {
      source: 'gateway',
      weather: data,
    };
  }

  @Get('weather/:city')
  async getWeatherByCity(@Param('city') city: string) {
    const { data } = await firstValueFrom(
      this.httpService.get(`${WEATHER_SERVICE_URL}/weather/${city}`),
    );
    return {
      source: 'gateway',
      weather: data,
    };
  }
}
