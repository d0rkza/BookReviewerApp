export class Book {
    bookId: number = 0;
    bookTitle: string = '';
    bookDescription: string = '';
    bookReleaseDate: string = '';
  }

export class CreateBookDTO {
    data: Data = new Data();
    eSign: ESign = new ESign();
  }

  export class Data {
      bookTitle: string = '';
      bookReleaseDate: string = '';
      bookDescription: string = '';
      authorIds: number[] = [];
     
      bookGenres: number[] = [];
  }

  export class ESign {
      username: string = '';
  }