import { Component, OnInit } from '@angular/core';
import {Book} from "../shared/book";
import {BookStoreService} from "../shared/book-store.service";
import getPrototypeOf = Reflect.getPrototypeOf;
import {AuthService} from "../shared/authentication.service";
import {Order} from "../shared/order";
import {OrderFactory} from "../shared/order-factory";
import {ActivatedRoute, Router} from "@angular/router";
import {User} from "../shared/user";


@Component({
  selector: 'bs-cart',
  templateUrl: './cart.component.html',
  styles: []
})
export class CartComponent implements OnInit {

  incart: Book[] = [];

  neworder: Order = OrderFactory.empty();

  //newOrder = [];

  price_netto: number = 0;
  price_brutto: number = 0;
  deliveryFee: number = 3;

  curUserId: number;
  //curUser: User;

  constructor(
      private bs : BookStoreService,
      private authService: AuthService,
      private route: ActivatedRoute,
      private router: Router
  ) { }

  ngOnInit() {
    this.curUserId = this.authService.getCurrentUserId();

    //Versuch den aktuellen User zu speichern
    //this.authService.getCurrentUser().subscribe(res => this.curUser = res)
    this.incart = this.getCurBooks();
    //this.incart = this.bs.getcart();
    console.log(this.incart);

    this.price_netto = this.getPrice();
    //this.setLocalStorage(this.incart);
  }

  getCurBooks() {
    if(localStorage.getItem('cart') === null) {
      return this.incart;
    } else {
      return JSON.parse(localStorage.getItem('cart'));
    }
  }

  getPrice() {
    for(const price of this.incart){
      this.neworder.price_netto += price.price;
    }
    this.neworder.price_brutto = Math.round((this.neworder.price_netto * 1.2) + this.deliveryFee);
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
      //localStorage.removeItem('cart');
      //localStorage.setItem('cart', JSON.stringify([]));
    });
  }

  emptyCurCart() {
    this.bs.emptycart();
    location.reload();

  }


}
