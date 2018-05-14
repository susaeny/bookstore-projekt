import {Injectable} from '@angular/core';
import {Book, Author, Image} from "./book";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {Order} from "./order";
import {Rating} from "./rating";

@Injectable()
export class BookStoreService {

    books: Book[];
    orders: Order[];
    cart: Book[] = [];

    private api: String = "http://bookstore18-rest.s1510456030.student.kwmhgb.at/api";

    constructor(private http: HttpClient) {
    }

    addtocart(book: Book) {
        this.cart.push(book);
        localStorage.setItem('cart', JSON.stringify(this.cart));
        console.log(localStorage);
    }

    getcart() {
        return this.cart;
        //return JSON.parse(localStorage.getItem('cart'));
    }

    emptycart() {
        this.cart = [];
        localStorage.removeItem('cart');
        //localStorage.setItem('cart', JSON.stringify([]));
    }


    getAll(): Observable<Array<Book>> {
        return this.http.get(`${this.api}/books`).retry(3).catch(this.errorHandler);
    }

    getSingle(isbn) {
        return this.http.get(`${this.api}/book/${isbn}`).retry(3).catch(this.errorHandler);
    }

    create(book: Book): Observable<any> {
        return this.http.post(`${this.api}/book`, book).retry(3).catch(this.errorHandler);
    }

    update(book: Book): Observable<any> {
        return this.http.put(`${this.api}/book/${book.isbn}`, book).retry(3).catch(this.errorHandler);
    }

    remove(isbn: String): Observable<any> {
        return this.http.delete(`${this.api}/book/${isbn}`).retry(3).catch(this.errorHandler);
    }


    // ADDED FOR ORDER //

    getCurOrders(user_id: number): Observable<Array<Order>> {
        return this.http.get(`${this.api}/orders/${user_id}`).retry(3).catch(this.errorHandler);
    }

    //würde man brauchen, wenn man alle Orders ausgeben möchte
    /*getAllOrders():Observable<Array<Order>> {
     return this.http.get(`${this.api}/orders`).retry(3).catch(this.errorHandler);
     }*/

    getSingleOrder(id) {
        return this.http.get(`${this.api}/order/${id}`).retry(3).catch(this.errorHandler);
    }

    createOrder(order: Order): Observable<any> {
        console.log(order);
        return this.http.post(`${this.api}/order`, order).retry(3).catch(this.errorHandler);
    }

    // ADDED FOR RATING //

    getRatings(book_id: number): Observable<Array<Rating>> {
        return this.http.get(`${this.api}/ratings/${book_id}`).retry(3).catch(this.errorHandler);
    }

    createRating(rating: Rating): Observable<any> {
        return this.http.post(`${this.api}/rating`, rating).retry(3).catch(this.errorHandler);
    }

    //ADDED FOR AUTOR //

    getAllAuthors(): Observable<Array<Author>> {
        return this.http.get(`${this.api}/authors`).retry(3).catch(this.errorHandler);
    }


    private errorHandler(error: Error | any): Observable<any> {
        return Observable.throw(error);
    }


}
