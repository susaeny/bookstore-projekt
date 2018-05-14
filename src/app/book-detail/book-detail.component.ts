import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Book} from "../shared/book";
import {BookStoreService} from "../shared/book-store.service";
import {ActivatedRoute, Router} from "@angular/router";
import {BookFactory} from "../shared/book-factory";
import {AuthService} from "../shared/authentication.service";

@Component({
  selector: 'bs-book-detail',
  templateUrl: './book-detail.component.html',
  styles: []
})
export class BookDetailComponent implements OnInit {
  book: Book = BookFactory.empty();
  cart: Book[] = [];

  constructor (
      private bs : BookStoreService,
      private router: Router,
      private route: ActivatedRoute,
      public authService: AuthService
  ){}

  ngOnInit() {
    const params = this.route.snapshot.params;
    this.bs.getSingle(params['isbn']).subscribe(b => this.book = b);

    console.log(this.book);
  }

  getRating (num:number) {
    return new Array(num);
  }

  getAggregatedRating(book: Book) {
    if (book.id != null && book.ratings.length > 0) {
      let allStars = 0;
      for (var i = 0; i < book.ratings.length; i++) {
        allStars += book.ratings[i].stars;
      }
      let rating: number = allStars / book.ratings.length;
      return new Array(Math.floor(rating));
    }
    //Return default Rating 3
    else return new Array(3);
  }

  removeBook() {
    if(confirm('Delet Book?')) {
      this.bs.remove(this.book.isbn).subscribe(result => this.router.navigate(['../', {relativeTo: this.route}]))
    }
  }

  addtocart(book: Book) {
    this.cart.push(book);
    localStorage.setItem('cart', JSON.stringify(this.cart));
    console.log(localStorage);
  }



}
