import {Book} from "./book";
export class Order {

    constructor(public id: number,
                public books: Book[],
                public published: Date,
                public user_id: number,
                public price_netto: number,
                public price_brutto: number,) {
    }
}
