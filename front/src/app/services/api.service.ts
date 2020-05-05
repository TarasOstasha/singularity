import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import{ toQueryString } from './lib/staff'

import  appState  from '../app-state';


var url = 'http://localhost:3000/';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  appState = appState;

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
  getSearchData(query) {
    return this.http.get( `${url}search?q=${query}` ).toPromise();
  }

  getProducts() {
    return this.http.get( url + 'products' ).toPromise();
  }

  addFavoriteProducts(product) {
    return this.http.post( url + 'favorite-products', product ,httpOptions ).toPromise();
  }

  // favoriteProduct(_id) {
  //   return this.http.post( url + 'favorite-products', { _id, userId: this.userId }, httpOptions ).toPromise();
  // }

  get userId() {
    return this.appState.header.user._id
  }

  ///// flight
  getLocalization() {
    return this.http.get(url + 'localization').toPromise();
  }

  browseData(obj) {
    const query = toQueryString(obj);
    return this.http.get( url + 'reqData' + query).toPromise();
  }

  getListPlaces(country) {
    const query = toQueryString(country);
    return this.http.get( url + 'listPlaces' + query ).toPromise();
  }

}
