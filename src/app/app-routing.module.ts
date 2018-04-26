import {Routes, RouterModule} from "@angular/router";
import {HomeComponent} from "./home/home.component";
import {BookListComponent} from "./book-list/book-list.component";
import {BookDetailComponent} from "./book-detail/book-detail.component";
import {NgModule} from "@angular/core";
import {BookFormComponent} from "./book-form/book-form.component";
import {LoginComponent} from "./admin/login/login.component";


const routes: Routes = [
    { path: '', redirectTo:'home', pathMatch: 'full'},
    { path: 'home', component: HomeComponent },
    { path: 'books', component: BookListComponent },
    { path: 'books/:isbn', component: BookDetailComponent },
    { path: 'admin', component: BookFormComponent },
    { path: 'admin/:isbn', component: BookFormComponent },
    { path: 'login', component: LoginComponent },

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: []
})

export class AppRoutingModule {}