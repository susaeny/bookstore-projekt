import { Component, OnInit } from '@angular/core';
import {Book} from "../shared/book";
import {BookStoreService} from "../shared/book-store.service";
import getPrototypeOf = Reflect.getPrototypeOf;
import {AuthService} from "../shared/authentication.service";
import {Order} from "../shared/order";
import {OrderFactory} from "../shared/order-factory";
import {ActivatedRoute, Router} from "@angular/router";


@Component({
  selector: 'bs-order-overview',
  templateUrl: './order-overview.component.html',
  styles: []
})
export class OrderOverviewComponent implements OnInit {
  incart: Book[];
  neworder: Order = OrderFactory.empty();

  price_netto: number = 0;
  price_brutto: number = 0;
  deliveryFee: number = 5;

  curUserId: number;

  constructor(
      private bs : BookStoreService,
      private authService: AuthService,
      private route: ActivatedRoute,
      private router: Router
  ) { }

  ngOnInit() {
    this.incart = JSON.parse(localStorage.getItem('cart'));
    console.log(this.incart);

    this.price_netto = this.getPrice();
    //this.setLocalStorage(this.incart);
  }

  getPrice() {
    for(const price of this.incart){
      this.neworder.price_netto += price.price;
    }
    this.neworder.price_brutto = this.neworder.price_netto + this.deliveryFee;
    return this.neworder.price_netto;
  }

  saveOrder() {

    this.curUserId = this.authService.getCurrentUserId();

    const order: Order = OrderFactory.fromObject(this.incart);
    order.books = this.incart;
    order.price_netto = this.neworder.price_netto;
    order.price_brutto = this.neworder.price_brutto;
    order.user_id = this.curUserId;

    this.bs.createOrder(order).subscribe(result => {
      this.router.navigate(['../confirm'], {relativeTo: this.route}),
          this.neworder = OrderFactory.empty();
      this.incart = [];
      this.bs.emptycart();
      localStorage.removeItem('cart');
    });
  }

}
