export class ErrorMessage {
    constructor(public forControl: string,
                public forValidator: string,
                public text: string) {
    }
}
export const RatingFormErrorMessages = [
    new ErrorMessage('stars', 'required', 'Es muss eine Bewertung abgegeben werden'),
];