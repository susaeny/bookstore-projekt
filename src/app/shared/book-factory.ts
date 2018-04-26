import {Book} from "./book";
export class BookFactory {

    static empty() : Book {
        return new Book(null,'','',[], new Date(),0,'', 0, [{id:0, url:'',title:''}],'', 0);
    }

    static fromObject (rawBook: any): Book {
        return new Book (
                rawBook.id,
                rawBook.isbn,
                    rawBook.title,
                    rawBook.authors,
                typeof(rawBook.published)==="string"?
                 new Date(rawBook.published): rawBook.published,
                    rawBook.user_id,
                rawBook.subtitle,
                rawBook.rating,
                    rawBook.thumbnails,
                    rawBook.description,
            rawBook.price
        );
    }
}
