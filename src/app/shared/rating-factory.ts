import {Rating} from "./rating";
export class RatingFactory {

    static empty() : Rating {
        return new Rating(null,'',0, new Date() ,0,0);
    }

    static fromObject (rawRating: any): Rating {
        return new Rating (
            rawRating.id,
            rawRating.comment,
            rawRating.stars,
            typeof(rawRating.published)==="string"?
                new Date(rawRating.published): rawRating.published,
            rawRating.user_id,
            rawRating.book_id
        );
    }
}
