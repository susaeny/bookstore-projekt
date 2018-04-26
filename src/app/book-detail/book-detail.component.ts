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

  constructor (
      private bs:BookStoreService,
      private router: Router,
      private route: ActivatedRoute,
      public authService: AuthService
  ){}

  getRating (num:number) {
    return new Array(num);
  }

  ngOnInit() {
    const params = this.route.snapshot.params;
    this.bs.getSingle(params['isbn']).subscribe(b => this.book = b);
  }

  removeBook() {
    if(confirm('Delet Book?')) {
      this.bs.remove(this.book.isbn).subscribe(result => this.router.navigate(['../', {relativeTo: this.route}]))
    }
  }
}
