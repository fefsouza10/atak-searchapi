import { Module } from '@nestjs/common';
import { SearchModule } from './search/search.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AppController } from './app.controller';

@Module({
  controllers: [AppController],
  imports: [SearchModule, AuthModule, UsersModule],
})
export class AppModule {}
