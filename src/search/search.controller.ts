import {
  Controller,
  Get,
  HttpCode,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { SearchDTO } from './dto/search.dto';
import { SearchService } from './search.service';

@Controller()
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @UseGuards(JwtAuthGuard)
  @Get('puppeteer')
  @HttpCode(200)
  async getSearchResultsWithPuppeteer(
    @Query(
      new ValidationPipe({
        transform: true,
        transformOptions: { enableImplicitConversion: true },
        forbidNonWhitelisted: true,
      }),
    )
    searchDTO: SearchDTO,
  ): Promise<string> {
    return this.searchService.getSearchResultshWithPuppeteer(searchDTO);
  }

  @UseGuards(JwtAuthGuard)
  @Get('cheerio')
  @HttpCode(200)
  async getSearchResultsWithCheerio(
    @Query(
      new ValidationPipe({
        transform: true,
        transformOptions: { enableImplicitConversion: true },
        forbidNonWhitelisted: true,
      }),
    )
    searchDTO: SearchDTO,
  ): Promise<string> {
    return this.searchService.getSearchResultsWithCheerio(searchDTO);
  }
}
