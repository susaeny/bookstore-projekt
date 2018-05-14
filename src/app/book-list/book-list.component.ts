import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {Book} from "../shared/book";
import {BookStoreService} from "../shared/book-store.service";

@Component({
    selector: 'bs-book-list',
    templateUrl: './book-list.component.html',
    styles: []
})
export class BookListComponent implements OnInit {

    books: Book[];

    constructor(private bs: BookStoreService) {
    }

    ngOnInit() {
        this.bs.getAll().subscribe(result => this.books = result);
    }
}
