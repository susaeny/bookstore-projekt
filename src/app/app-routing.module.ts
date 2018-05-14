import {Routes, RouterModule} from "@angular/router";
import {HomeComponent} from "./home/home.component";
import {BookListComponent} from "./book-list/book-list.component";
import {BookDetailComponent} from "./book-detail/book-detail.component";
import {NgModule} from "@angular/core";
import {BookFormComponent} from "./book-form/book-form.component";
import {LoginComponent} from "./admin/login/login.component";
import {OrderListComponent} from "./order-list/order-list.component";
import {OrderDetailComponent} from "./order-detail/order-detail.component";
import {CartComponent} from "./cart/cart.component";
import {ConfirmationComponent} from "./confirmation/confirmation.component";
import {RatingFormComponent} from "./rating-form/rating-form.component";
import {OrderOverviewComponent} from "./order-overview/order-overview.component";


const routes: Routes = [
    { path: '', redirectTo:'home', pathMatch: 'full'},
    { path: 'home', component: HomeComponent },
    { path: 'books', component: BookListComponent },
    { path: 'orders', component: OrderListComponent },
    { path: 'orders/:id', component: OrderDetailComponent },
    { path: 'books/:isbn', component: BookDetailComponent },
    { path: 'admin', component: BookFormComponent },
    { path: 'admin/:isbn', component: BookFormComponent },
    { path: 'login', component: LoginComponent },
    { path: 'cart', component: CartComponent},
    { path: 'overview', component: OrderOverviewComponent},
    { path: 'confirm', component: ConfirmationComponent},
    { path: 'rating', component: RatingFormComponent},
    { path: 'rating/:isbn', component: RatingFormComponent},

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: []
})

export class AppRoutingModule {}