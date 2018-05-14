import {Component, OnInit} from '@angular/core';
import {Order} from "../shared/order";
import {BookStoreService} from "../shared/book-store.service";
import {AuthService} from "../shared/authentication.service";

@Component({
    selector: 'bs-order-list',
    templateUrl: './order-list.component.html',
    styles: []
})
export class OrderListComponent implements OnInit {

    orders: Order[];
    curUser: number;

    constructor(private bs: BookStoreService,
                private auth: AuthService) {
    }

    ngOnInit() {
        this.curUser = this.auth.getCurrentUserId();
        this.bs.getCurOrders(this.curUser).subscribe(result => this.orders = result);
    }

}


