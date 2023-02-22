import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import puppeteer from 'puppeteer';
import cheerio from 'cheerio';
import { SearchDTO } from './dto/search.dto';
import fetch from 'node-fetch';

@Injectable()
export class SearchService {
  async getSearchResultshWithPuppeteer(searchDTO: SearchDTO): Promise<string> {
    let searchResults: { title: string; link: any }[] = [];
    const browser = await puppeteer.launch({ headless: true });

    try {
      const page = await browser.newPage();
      await page.setJavaScriptEnabled(false);

      await page.setViewport({ width: 1080, height: 1024 });

      await Promise.all([
        page.goto(
          `https://www.google.com/search?q=${searchDTO.query}&start=${searchDTO.page}`,
          {
            waitUntil: 'networkidle2',
          },
        ),
      ]);

      searchResults = await page.$$eval(
        '.Gx5Zad.fP1Qef.xpd.EtOod.pkphOe > div > a > div',
        (els) =>
          els.map((e) => ({
            title: e.firstChild?.firstChild?.firstChild?.textContent,
            link: e.lastChild?.firstChild?.textContent?.replaceAll(
              /( › )/g,
              '/',
            ),
          })),
      );

      await browser.close();
      return JSON.stringify(searchResults);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Internal Server Error',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
        {
          cause: error,
        },
      );
    }
  }

  async getSearchResultsWithCheerio(searchDTO: SearchDTO): Promise<string> {
    const searchResults: { title: string; link: any }[] = [];
    const searchUrl = `https://www.google.com/search?q=${searchDTO.query}&start=${searchDTO.page}`;

    try {
      const response = await fetch(searchUrl, {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36',
        },
      })
        .then((response) => response.text())
        .then((html) => {
          const $ = cheerio.load(html);

          let titles: string[] = [];
          let links: any[] = [];

          $('.yuRUbf > a > h3').each((i, e) => {
            titles[i] = $(e).text();
          });
          $('.yuRUbf > a').each((i, e) => {
            links[i] = $(e).attr('href');
          });

          for (let i = 0; i < titles.length; i++) {
            searchResults[i] = {
              title: titles[i],
              link: links[i],
            };
          }
        });

      return JSON.stringify(searchResults);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Internal Server Error',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
        {
          cause: error,
        },
      );
    }
  }
}
