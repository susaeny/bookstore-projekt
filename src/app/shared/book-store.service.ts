import { Injectable } from '@angular/core';
import {Book, Author, Image} from "./book";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class BookStoreService {

  books: Book[];

    private api: String = "http://bookstore18-rest.s1510456030.student.kwmhgb.at/api";

  constructor(
      private http: HttpClient) {


 /*   this.books = [
      new Book(1,
          '9783864903571',
          'Angular',
          [new Author(1,'Johannes', 'Hoppe'), new Author(2,'Danny','Koppenhagen'),
            new Author(3,'Ferdinand','Malcher'), new Author(4,'Gregor', 'Woiwode')],
          new Date(2017, 3, 1),
          1,
          'Grundlagen, fortgeschrittene Techniken und Best Practices mit TypeScript - ab Angular 4, inklusive NativeScript und Redux',
          5,
          [new Image(1,'https://ng-buch.de/cover2.jpg', 'Buchcover')],
          'Mit Angular setzen Sie auf ein modernes und modulares...'
      ),
      new Book(2,
          '9783864901546',
          'AngularJS',
          [new Author(5,'Philipp', 'Tarasiewicz'),new Author(6,'Robin', 'Böhm')],
          new Date(2014, 5, 29),
          1,
          'Eine praktische Einführung',
          5,
          [new Image(2,'https://ng-buch.de/cover1.jpg', 'Buchcover')],
          'Dieses Buch führt Sie anhand eines zusammenhängenden Beispielprojekts...'
      )
    ];
 */
  }

  getAll():Observable<Array<Book>> {
    return this.http.get(`${this.api}/books`).retry(3).catch(this.errorHandler);
  }

  getSingle (isbn) {
      return this.http.get(`${this.api}/book/${isbn}`).retry(3).catch(this.errorHandler);
  }

  create (book: Book): Observable<any> {
      return this.http.post(`${this.api}/book`, book).retry(3).catch(this.errorHandler);
  }

  update (book: Book): Observable<any>{
        return this.http.put(`${this.api}/book/${book.isbn}`, book).retry(3).catch(this.errorHandler);
  }

  remove(isbn: String): Observable<any>{
        return this.http.delete(`${this.api}/book/${isbn}`).retry(3).catch(this.errorHandler);
  }


  private errorHandler(error: Error | any): Observable<any> {
      return Observable.throw(error);
  }



}
