import { Component } from '@angular/core';
import { User } from './models/user';
import { Book, CreateBookDTO } from './models/book';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { BookDetails } from './models/bookDetails';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'BookReviewerApp';
  books: Book[] = [];
  editBook: Book;
  user = new User();
  pageNumber = '';
  numberOfResults = '';
  bookId = 0;
  response = '';
  bookTitle = '';
  bookDetails: BookDetails = new BookDetails();
  createBookDetails: CreateBookDTO = new CreateBookDTO();

  constructor(private authService: AuthService) 
  {
    this.editBook = new Book();
  }

  login(user: User) {
    this.authService.login(user).subscribe((token: string) => {
      localStorage.setItem('authToken', token);
    });
  }

  getBooks(bookTitle: string) {
    this.authService.getBooks(bookTitle).subscribe(data => {
      this.books = data;
    });
  }

  getBooksPaged(pageNumber: string, numberOfResults: string) {
    this.authService.getBooksPaged(pageNumber, numberOfResults).subscribe(data => {
      this.books = data;
    });
  }

  getBookDetails(bookId: number) {
    this.authService.getBookDetails(bookId).subscribe(data => {
      this.bookDetails = data;
    })
  }

  editBookDetails(bookId: number, bookNewTitle: string, bookNewDescription: string) {
    this.authService.editBookDetails(bookId, bookNewTitle, bookNewDescription).subscribe(data => {
      this.response = data;
    })
  }

  deleteBook(bookId: number) {
    this.authService.deleteBook(bookId).subscribe(data => {
      this.response = data;
    })
  }

  createBook(bookDetails: CreateBookDTO) {
    this.authService.createBook(bookDetails).subscribe(data => {
      this.response = data;
    })
  }

  addAuthorId() {
    this.createBookDetails.data.authorIds.push(0);
  }
  addGenre() {
    this.createBookDetails.data.bookGenres.push(0);
  }
  removeAuthorId(index: number) {
    this.createBookDetails.data.authorIds.splice(index, 1);
  }
  removeGenre(index: number) {
    this.createBookDetails.data.bookGenres.splice(index, 1);
  }
    

}

