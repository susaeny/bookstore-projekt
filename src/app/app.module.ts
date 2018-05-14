import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { BookListComponent } from './book-list/book-list.component';
import { BookListItemComponent } from './book-list-item/book-list-item.component';
import { BookDetailComponent } from './book-detail/book-detail.component';
import {BookStoreService} from "./shared/book-store.service";

import { HomeComponent } from './home/home.component';
import {AppRoutingModule} from "./app-routing.module";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {ReactiveFormsModule} from "@angular/forms";
import { DateValueAccessorModule} from "angular-date-value-accessor";
import { BookFormComponent } from './book-form/book-form.component';
import { LoginComponent } from './admin/login/login.component';
import {AuthService} from "./shared/authentication.service";
import {TokenInterceptorService} from "./shared/token-interceptor.service";
import {JwtInterceptorService} from "./shared/jwt-interceptor.service";
import { OrderListComponent } from './order-list/order-list.component';
import { OrderListItemComponent } from './order-list-item/order-list-item.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { CartComponent } from './cart/cart.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { RatingItemComponent } from './rating-item/rating-item.component';
import { RatingFormComponent } from './rating-form/rating-form.component';
import { OrderOverviewComponent } from './order-overview/order-overview.component';

@NgModule({
  declarations: [
    AppComponent,
    BookListComponent,
    BookListItemComponent,
    BookDetailComponent,
    HomeComponent,
    BookFormComponent,
    LoginComponent,
    OrderListComponent,
    OrderListItemComponent,
    OrderDetailComponent,
    CartComponent,
    ConfirmationComponent,
    RatingItemComponent,
    RatingFormComponent,
    OrderOverviewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    DateValueAccessorModule
  ],
  providers: [BookStoreService, AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
