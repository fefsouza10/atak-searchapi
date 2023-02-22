import { IsNotEmpty } from 'class-validator';

export class SearchDTO {
  @IsNotEmpty()
  query: string;

  @IsNotEmpty()
  page: number;
}
