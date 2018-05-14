import {Book} from "./book";

export class BookFactory {

    static empty(): Book {
        return new Book(null, '', '', [{id: 0, firstname: '', lastname: ''}], new Date(), 0, '', [{
            id: 0,
            comment: '',
            stars: 0,
            published: new Date(),
            book_id: 0,
            user_id: 0
        }], [{id: 0, url: '', title: ''}], '', 0, false);
    }

    static fromObject(rawBook: any): Book {
        return new Book(
            rawBook.id,
            rawBook.isbn,
            rawBook.title,
            rawBook.authors,
            typeof(rawBook.published) === "string" ?
                new Date(rawBook.published) : rawBook.published,
            rawBook.user_id,
            rawBook.subtitle,
            rawBook.ratings,
            rawBook.thumbnails,
            rawBook.description,
            rawBook.price,
            rawBook.deleted
        );
    }
}
