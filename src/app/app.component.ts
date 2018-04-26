import { Component } from '@angular/core';
import {Book} from "./shared/book";
import {AuthService} from "./shared/authentication.service";

@Component({
  selector: 'bs-root',
  templateUrl: './app.component.html',
  //template: '<bs-book-list></bs-book-list',
})
export class AppComponent {
  title = 'Bookstore';

  listOn = true;
  //detailsOn = false;

  book: Book;

  showList(){
    this.listOn = !this.listOn;
  }

  showDetail(book: Book) {
    this.book = book;
    this.listOn = !this.listOn;
  }

  constructor(private authService: AuthService) {}

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  getLoginLabel() {
    if(this.isLoggedIn()) {
      return "Logout";
    } else {
      return "Login";
    }
  }



}
