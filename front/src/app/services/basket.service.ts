import { Injectable } from '@angular/core';
import appState from '../app-state';
import { StorageService } from '../services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  appState = appState;
  //counter: number = 1;
  basket: any = [];

  // { amount: '', product: {product} }

  constructor(private storage: StorageService) { }


  plus(product) {
    this.refreshBasket();
    let index;
    const existProduct = this.basket.some((item, i) => {
      index = i;
      return item.product._id == product._id;
    });

    if (existProduct) this.basket[index].amount++;
    else this.basket.push({ amount: 1, product });

    this.storage.setBasketStorage(this.basket);
    return this.basket

  }

  productQuantity() {
    //this.refreshBasket();
    //this.basket = await this.storage.getBasketFromStorage(); // this is PROBLEM
    return this.basket.reduce((sum, item) => sum + item.amount, 0);

  }

  refreshBasket() {
    this.basket = this.storage.getBasketFromStorage();
  }

  minus(product) {
    this.refreshBasket();
    //this.basket = this.storage.getBasketFromStorage(); // duplicated
    this.basket.map((item, index) => {
      console.log(index, 'index map')
      if (item.product._id == product._id) {
        console.log('product id are the same')
        console.log(item.amount)
        console.log(this.basket[index])
        if (item.amount > 1) this.basket[index].amount--; //// ????????
      }
    });
    this.storage.setBasketStorage(this.basket); 
  }

  deleteProduct(id) {
    this.refreshBasket();
    this.basket.map((product, index) => {
      if (product.product._id == id) {
        console.log(this.basket)
        this.basket.splice(index, 1);

      }
    })
    this.storage.setBasketStorage(this.basket);
  }


  subTotalPrice(amount, price) {
    return amount * price;
  }

  totalPrice() {
    this.refreshBasket();
    let total = 0; 
    this.basket.map((product) => {
      total += product.product.price * product.amount;
    })
    return total;
  }
}
