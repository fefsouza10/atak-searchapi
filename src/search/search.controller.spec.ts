import { Test, TestingModule } from '@nestjs/testing';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';

describe('SearchController', () => {
  let searchController: SearchController;
  let searchService: SearchService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [SearchController],
      providers: [SearchService],
    }).compile();

    searchController = app.get<SearchController>(SearchController);
    searchService = app.get<SearchService>(SearchService);
  });

  describe('getSearchResultsWithPuppeteer', () => {
    it('should return an array of objects with at least three items', async () => {
      const searchResult = await searchController.getSearchResultsWithPuppeteer(
        {
          query: 'Maringá',
          page: 0,
        },
      );
      const searchResultArray = Array.from(JSON.parse(searchResult));
      expect(searchResultArray.length > 3).toBe(true);
    });
  });

  describe('getSearchResultsWithCheerio', () => {
    it('should return an array of objects with at least three items', async () => {
      const searchResult = await searchController.getSearchResultsWithCheerio({
        query: 'Maringá',
        page: 0,
      });
      const searchResultArray = Array.from(JSON.parse(searchResult));
      expect(searchResultArray.length > 3).toBe(true);
    });
  });
});
