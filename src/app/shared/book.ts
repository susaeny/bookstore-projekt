import {Author} from "./author";
import {Image} from "./image";
import {Rating} from "./rating";

export {Author} from "./author";
export {Image} from "./image";
export {Rating} from "./rating"

export class Book {
    constructor (
        public id: number,
        public isbn: string,
        public title: string,
        public authors: Author[],
        public published: Date,
        public user_id: number,
        public subtitle?: string,
        public ratings?: Rating[],
        public images?: Image[],
        public description?: string,
        public price?: number,
        public deleted?: boolean
    )
    {}
}
