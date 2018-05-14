import {Component, OnInit} from '@angular/core';
import {Order} from "../shared/order";
import {OrderFactory} from "../shared/order-factory";
import {BookStoreService} from "../shared/book-store.service";
import {ActivatedRoute} from "@angular/router";


@Component({
    selector: 'bs-order-detail',
    templateUrl: './order-detail.component.html',
    styles: []
})
export class OrderDetailComponent implements OnInit {

    order: Order = OrderFactory.empty();

    constructor(private bs: BookStoreService,
                private route: ActivatedRoute) {
    }

    ngOnInit() {
        const order_id = this.route.snapshot.params['id'];
        this.bs.getSingleOrder(order_id).subscribe(order => this.order = order);
    }

}
