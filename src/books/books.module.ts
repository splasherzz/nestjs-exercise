import { Module, forwardRef } from '@nestjs/common';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { AuthorsModule } from '../authors/authors.module';

@Module({
  controllers: [BooksController],
  providers: [BooksService],
  exports: [BooksService],
  imports: [forwardRef(() => AuthorsModule)],
})
export class BooksModule { }
