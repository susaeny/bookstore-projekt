import { Component, OnInit } from '@angular/core';
import {BookStoreService} from "../shared/book-store.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Rating} from "../shared/rating";
import {AuthService} from "../shared/authentication.service";
import {User} from "../shared/user";
import {RatingFactory} from "../shared/rating-factory";
import {Book} from "../shared/book";
import {ActivatedRoute, Router} from "@angular/router";
import {RatingFormErrorMessages} from "./rating-form-error-messages";



@Component({
  selector: 'bs-rating-form',
  templateUrl: './rating-form.component.html',
  styles: []
})
export class RatingFormComponent implements OnInit {

  myForm: FormGroup;
  rating: Rating = RatingFactory.empty();

  curUserId: number;
  book: Book;

  errors: {[key:string]:string} = {};


  constructor(
      private fb: FormBuilder,
      private bs: BookStoreService,
      private auth: AuthService,
      private route: ActivatedRoute,
      private router: Router,

  ) { }

  ngOnInit() {
    this.curUserId = this.auth.getCurrentUserId();

    const isbn = this.route.snapshot.params['isbn'];

    console.log("isbn: " + isbn);

      this.bs.getSingle(isbn).subscribe(book => {
        this.book = book;
      });

    //console.log(this.book.id);


   this.initRating()
  }

  initRating(){

    this.myForm = this.fb.group({
      id: this.rating.id,
      comment: this.rating.comment,
      stars: this.rating.stars,
      published: new Date(),
    });

    this.myForm.statusChanges.subscribe(()=>this.updateErrorMessages());


    //reactive forms -> fehlermeldungen update
    //this.myForm.statusChanges.subscribe(()=>this.updateErrorMessages());
  }


  submitForm(){

    console.log(this.myForm.value);
    //const rating: Rating = RatingFactory.fromObject(this.myForm.value);
    const rating: Rating = RatingFactory.empty();
    rating.id = this.myForm.value.id;
    rating.comment = this.myForm.value.comment;
    rating.stars = this.myForm.value.stars;
    rating.user_id = this.curUserId;
    rating.book_id = this.book.id;

    console.log(rating);

    this.bs.createRating(rating).subscribe(res => {
      this.rating = RatingFactory.empty();
      this.myForm.reset(RatingFactory.empty());
      this.router.navigate(['../../books', this.book.isbn], {relativeTo: this.route});
    })

  }

  updateErrorMessages() {
    this.errors = {};
    for(const message of RatingFormErrorMessages) {
      const control = this.myForm.get(message.forControl);
      if(control && control.dirty && control.invalid && control.errors[message.forValidator]
          && !this.errors[message.forControl]) {
        this.errors[message.forControl] = message.text;
      }
    }
  }

}
