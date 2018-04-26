import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import * as decode from "jwt-decode";
import {isNullOrUndefined} from "util";

@Injectable()
export class AuthService {

  private api: String = "http://bookstore18-rest.s1510456030.student.kwmhgb.at/api/auth"

  constructor(private  http: HttpClient) { }

  login (email: string, password: string) {
    return this.http.post(`${this.api}/login`,{'email':email,'password':password});
  }

  public setLocalStorage (token:string) {
    console.log(token);
    const decodedToken = decode(token);
    console.log(decodedToken.user.id);
    localStorage.setItem('token', token);
    localStorage.setItem('userId', decodedToken.user.id);
  }

  public  getCurrentUserId() {
    return Number.parseInt(localStorage.getItem('userId'));
  }

  public logout() {
    this.http.post(`${this.api}/logout`, {});
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
  }

  public isLoggedIn() {
    return !isNullOrUndefined(localStorage.getItem('token'));
  }

  public isLoggedOut() {
    return !this.isLoggedIn();
  }
}
