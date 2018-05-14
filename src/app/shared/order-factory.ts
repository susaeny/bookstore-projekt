import {Order} from "./order";
export class OrderFactory {

    static empty(): Order {
        return new Order(null,
            [{
                id: 0,
                isbn: '',
                title: '',
                authors: [{id: 0, firstname: '', lastname: ''}],
                published: new Date(),
                user_id: 0,
                subtitle: '',
                ratings: [{id: 0, comment: '', stars: 0, published: new Date(), book_id: 0, user_id: 0}],
                images: [{id: 0, url: '', title: ''}],
                description: '',
                price: 0,
                deleted: false
            }],
            new Date(), 0, 0, 0);
    }

    static fromObject(rawOrder: any): Order {
        return new Order(
            rawOrder.id,
            rawOrder.books,
            typeof(rawOrder.published) === "string" ?
                new Date(rawOrder.published) : rawOrder.published,
            rawOrder.user_id,
            rawOrder.price_netto,
            rawOrder.price_brutto
        );
    }

}

