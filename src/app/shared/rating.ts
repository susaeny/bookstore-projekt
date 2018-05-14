export class Rating {
    constructor(public id: number,
                public comment: string,
                public stars: number,
                public published: Date,
                public book_id: number,
                public user_id: number,) {
    }
}
