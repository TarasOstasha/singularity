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
        return JSON.parse(localStorage.getItem(key));
    }

    clearItem(key) {
        localStorage.removeItem(key);
    }



}