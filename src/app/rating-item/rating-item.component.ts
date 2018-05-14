import { Component, OnInit, Input } from '@angular/core';
import {BookStoreService} from "../shared/book-store.service";
import {Book} from "../shared/book";
import {Rating} from "../shared/rating";
import {ActivatedRoute} from "@angular/router";
import {BookFactory} from "../shared/book-factory";


@Component({
  selector: 'bs-rating-item',
  templateUrl: './rating-item.component.html',
  styles: []
})
export class RatingItemComponent implements OnInit {

  @Input() bookIsbn: number;

  book: Book = BookFactory.empty();
  ratings: Rating[] = [];

  @Input() otherBook: Book;

  constructor(
      private bs : BookStoreService,
      private route: ActivatedRoute,

  ) { }

  ngOnInit() {


    //this.curUserId = this.auth.getCurrentUserId();

    const isbn = this.route.snapshot.params['isbn'];
    console.log("isbn: " + isbn);

    this.bs.getSingle(isbn).subscribe(book => {
      this.book = book;
      this.initRating();
    });
  }


  initRating(){
    this.bs.getRatings(this.book.id).subscribe(res => {
      this.ratings = res;
    });
    console.log("HELLO RATING" + this.ratings);
  }

  getRating (num:number) {
    return new Array(num);
  }

  getRandomNum() {
    return Math.floor(Math.random() * 12) + 1

  }
}
