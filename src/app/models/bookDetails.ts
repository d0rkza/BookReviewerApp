import {Author} from './author'
import {Genre} from './genre'
export class BookDetails {
    bookId: number = 0;
    bookTitle: string = 'Book Title placeholder';
    bookDescription: string = 'Description';
    bookReleaseDate: string = '';
    
    authors: Author[] = [];
    genres: Genre[] = [];
  }