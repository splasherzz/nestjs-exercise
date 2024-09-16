import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';

@Injectable()
export class AuthorsService {
    private authors = [];
    private authorID = 1;

    create(createAuthorDto: CreateAuthorDto) {
        const newAuthor = {
            id: this.authorID++,
            ...createAuthorDto
        };
        this.authors.push(newAuthor);
        return newAuthor;
    }

    findAll() {
        return this.authors;
    }

    findOne(id: number) {
        const author = this.authors.find((author) => author.id === id);
        if (!author) {
            throw new NotFoundException('Author not found');
        }
        return author;
    }

    update(id: number, updateAuthorDto: UpdateAuthorDto) {
        const author = this.findOne(id);
        const updatedAuthor = { ...author, ...updateAuthorDto };
        this.authors = this.authors.map((author) =>
            author.id === id ? updatedAuthor : author
        );
        return updatedAuthor;
    }

    remove(id: number) {
        const author = this.findOne(id);
        this.authors = this.authors.filter((author) => author.id !== id);
        return author;
    }
}
