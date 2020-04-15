import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import  appState  from '../app-state';


var url = 'http://localhost:3000/';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor( private http: HttpClient ) { }

  test() {
    return this.http.get(` ${url}test `).toPromise();
  }

  register(userData) {
    return this.http.post(url + 'register', userData, httpOptions).toPromise();
  }

  login(userData) {
    return this.http.post( url + 'login', userData, httpOptions ).toPromise();
  }

  logOut() {
    return this.http.get( url + 'log-out' ).toPromise();
  }

  product(productData) {
    return this.http.post( url + 'products', productData, httpOptions).toPromise();
  }

  getProduct(id) {
    return this.http.get(url + 'product/' + id).toPromise(); //productID
  }
}
