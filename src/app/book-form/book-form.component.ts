import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, FormArray, Validators} from "@angular/forms";
import {BookStoreService} from "../shared/book-store.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Book} from "../shared/book";
import {BookFactory} from "../shared/book-factory";
import {BookFormErrorMessages} from "./book-form-error-messages";

@Component({
  selector: 'bs-book-form',
  templateUrl: './book-form.component.html',
  styles: []
})
export class BookFormComponent implements OnInit {

  isUpdatingBook = false;
  book: Book = BookFactory.empty();

  myForm: FormGroup;
  thumbnails: FormArray;
  errors: {[key:string]:string} = {};

  constructor(
      private fb: FormBuilder,
      private bs: BookStoreService,
      private route: ActivatedRoute,
      private router: Router,
      ) { }

  ngOnInit() {

    //if isbn true -> edit
    const isbn = this.route.snapshot.params['isbn'];
    if(isbn) {
      this.isUpdatingBook = true;
      this.bs.getSingle(isbn).subscribe(book => {
        this.book = book;
        this.initBook();
        }
      )
    }
    this.initBook();
    //else -> new
  }

  initBook(){
    this.buildThumbnailsArray();

    this.myForm = this.fb.group({
          id: this.book.id,
          title: [this.book.title, Validators.required],
          subtitle: this.book.subtitle,
          isbn: [this.book.isbn, Validators.required],
          description: this.book.description,
          price: this.book.price,
          //TODO: Übung -> Authoren hinzufügen (Combobox, anzeigen, bestehenden auswählen, wenn author ned vorhanden -> +, dann neuer author hinzufügen)
          thumbnails: this.thumbnails,
          published: new Date(this.book.published)
      });

    //reactive forms -> fehlermeldungen update
    this.myForm.statusChanges.subscribe(()=>this.updateErrorMessages());
  }

  buildThumbnailsArray() {
    this.thumbnails = this.fb.array(
        //dynamische HTLM Tags
        this.book.images.map(
            img => this.fb.group({
              id: this.fb.control(img.id),
              url: this.fb.control(img.url),
              title: this.fb.control(img.title)
            })
        )
    )
  }

  addThumbnailControl() {
    this.thumbnails.push(this.fb.group({
      url: null,
      title: null
    }))
  }

  submitForm() {
    //filter empty values of thumbnails
    this.myForm.value.thumbnails = this.myForm.value.thumbnails.filter(thumbnail => thumbnail.url);
    const book: Book = BookFactory.fromObject(this.myForm.value);
    //just copy the rating and authors
    book.rating = this.book.rating;
    //TODO: bei der Übung umbauen (hack)
    book.authors = this.book.authors;

    //book.images = this.myForm.value.thumbnails;

    if(this.isUpdatingBook) {
      this.bs.update(book).subscribe(result => {this.router.navigate(['../../books', book.isbn], {relativeTo: this.route});
      })
    }
    else {
      //new Book
      book.user_id = 1;
      this.bs.create(book).subscribe(result => {
        this.book = BookFactory.empty();
        this.myForm.reset(BookFactory.empty());
       // this.router.navigate(['../../books', book.isbn], {relativeTo: this.route});
      })
    }

  }

  updateErrorMessages() {
    this.errors = {};
    for(const message of BookFormErrorMessages) {
      const control = this.myForm.get(message.forControl);
      if(control && control.dirty && control.invalid && control.errors[message.forValidator]
          && !this.errors[message.forControl]) {
        this.errors[message.forControl] = message.text;
      }
    }

  }

}
