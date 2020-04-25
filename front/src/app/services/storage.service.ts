import { Injectable } from '@angular/core';
import appState from '../app-state';

@Injectable({
    providedIn: 'root'
})

export class StorageService {

    constructor() { }

    setItem(key, value) {
        return localStorage.setItem(key, JSON.stringify(value));

    }

    getItem(key) {
        try {
            return JSON.parse(localStorage.getItem(key));
            
        } catch (error) {
            console.log(error)
        }
    }

    clearItem(key) {
        localStorage.removeItem(key);
    }

    getBasketFromStorage() {
        const basket = this.getItem('basket');
        return (Array.isArray(basket)) ? basket : [];
    }

    // refreshBasketStorage() {
    //     const json = JSON.stringify(appState.header.basket.products);
    //     localStorage.setItem('basket', json);
    // }

    setBasketStorage(basket) {
        appState.header.basket.products = basket;
        const json = JSON.stringify(basket);
        localStorage.setItem('basket', json);
    }


}