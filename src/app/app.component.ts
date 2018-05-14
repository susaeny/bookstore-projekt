import {Component, OnInit} from '@angular/core';
import {Book} from "./shared/book";
import {AuthService} from "./shared/authentication.service";

@Component({
    selector: 'bs-root',
    templateUrl: './app.component.html',
    //template: '<bs-book-list></bs-book-list',
})
export class AppComponent {
    title = 'Flourish und Blotts';
    book: Book;

    constructor(private authService: AuthService) {
    }

    isLoggedIn() {
        return this.authService.isLoggedIn();
    }

    isAdmin() {
        return this.authService.isAdmin();
    }

    getLoginLabel() {
        if (this.isLoggedIn()) {
            return "Logout";
        } else {
            return "Login";
        }
    }


}
