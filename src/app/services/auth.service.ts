import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { User } from '../models/user';
import { ObservableLike } from 'rxjs';
import { Book, CreateBookDTO } from '../models/book';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  private endPointUrl = 'https://localhost:5001/en-us/'

  private body = {
    data: {
      bookTitle: "",
      bookDescription: ""
    },
    eSign: {
      username: ""
    }
  }

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  public login(user: User): Observable<string> {
    var requestString = this.endPointUrl + 'Authentication/MyLogin'
    return this.http.post(requestString, user, {
      responseType: 'text',
    });
  }

  public getBooks(bookTitle: string): Observable<Book[]> {
    if(bookTitle.length === 0)
    {
      var requestString = this.endPointUrl + 'Book/GetBooks'
      return this.http.get<Book[]>(requestString, {
        responseType: 'json',
      });
    }
    else
    {
      var requestString = this.endPointUrl + 'Book/GetBooks?BookTitle=' + bookTitle;
      return this.http.get<Book[]>(requestString, {
        responseType: 'json',
      });
    }
  }

  public getBooksPaged(pageNumber: string, numberOfResults: string): Observable<Book[]> {
    var requestString = this.endPointUrl + 'Book/GetBooks?ResultsPerPage='+ numberOfResults +'&PageNumber=' + pageNumber;
    return this.http.get<Book[]>(requestString, {
      responseType: 'json',
    });
  }

  public getBookDetails(bookId: number): Observable<any> {
    var requestString = this.endPointUrl + 'Book/GetBookDetails?BookId=' + bookId;
    return this.http.get<any>(requestString, {
      responseType: 'json',
    })
  }

  public editBookDetails(bookId: number, bookNewTitle: string, bookNewDescription: string): Observable<any> {
    var requestString = this.endPointUrl + 'Book/' + bookId + '/Edit';
    this.body.data.bookTitle = bookNewTitle;
    this.body.data.bookDescription = bookNewDescription;
    return this.http.put(requestString, this.body, {
      responseType: 'json',
    })
  }

  public deleteBook(bookId: number): Observable<any> {
    var requestString = this.endPointUrl + 'Book/' + bookId + '/Delete';
    return this.http.put(requestString, this.body, {
      responseType: 'json',
    })
  }

  public createBook(bookDetails: CreateBookDTO): Observable<any> {
    var requestString = this.endPointUrl + 'Book/Create';
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(requestString, JSON.stringify(bookDetails), { headers: headers },)
  }
}
