import { Component, OnInit, Input } from '@angular/core';
import {Book} from "../shared/book";
import {Order} from "../shared/order";

@Component({
  selector: 'a.bs-order-list-item',
  templateUrl: './order-list-item.component.html',
  styles: []
})
export class OrderListItemComponent implements OnInit {

  @Input() order: Order;


  constructor() { }

  ngOnInit() {
    console.log(this.order);
    console.log(this.order.books);
  }

}
