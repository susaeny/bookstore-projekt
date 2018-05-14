import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import * as decode from "jwt-decode";
import {isNullOrUndefined} from "util";
import {User} from "./user";
import {Order} from "./order";
import {BookStoreService} from "./book-store.service";

@Injectable()
export class AuthService {

  private api: String = "http://bookstore18-rest.s1510456030.student.kwmhgb.at/api/auth";
  //curUser: any;

  constructor(private  http: HttpClient,
  private bs: BookStoreService) { }

  login (email: string, password: string) {
    return this.http.post(`${this.api}/login`,{'email':email,'password':password});
  }

  public setLocalStorage (token:string) {
    console.log(token);
    const decodedToken = decode(token);

    console.log(decodedToken);

    console.log(decodedToken.user.id);
    console.log(decodedToken.user.admin);

    localStorage.setItem('token', token);
    localStorage.setItem('userId', decodedToken.user.id);
    localStorage.setItem('isAdmin', decodedToken.user.admin);
  }

  public  getCurrentUserId() {
    return Number.parseInt(localStorage.getItem('userId'));
  }

  public getCurrentUser() {
    this.http.get(`${this.api}/user`);
  }


  public logout() {
    this.http.post(`${this.api}/logout`, {});
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('cart');
    localStorage.removeItem('isAdmin');
  }

  public isLoggedIn() {
    return !isNullOrUndefined(localStorage.getItem('token'));
  }

  public isAdmin() {
    //return !isNullOrUndefined(localStorage.getItem('isAdmin'));
    if (this.isLoggedIn()) {
      if (Number.parseInt(localStorage.getItem('isAdmin')) == 0) return false;
      else return true;
    }
    return false;
  }


  public isLoggedOut() {
    return !this.isLoggedIn();
  }
}
