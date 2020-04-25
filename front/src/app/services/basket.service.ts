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


  async plus(product) {
    
   this.basket = await this.storage.getBasketFromStorage(); //duplicated
    let index;
    const existProduct = this.basket.some((item, i) => {
      index = i;
      return item.product._id == product._id;
    });
 
    if (existProduct) this.basket[index].amount++;
    else this.basket.push({ amount: 1, product });
  
    this.appState.header.basket.products = this.basket; 
    this.storage.refreshBasketStorage();
    
  }

  productQuantity() {
    //this.refreshBasket();
    //this.basket = await this.storage.getBasketFromStorage(); // this is PROBLEM
    return this.basket.reduce((sum, item) => sum + item.amount, 0);

  }

   async refreshBasket() {
    this.basket = await this.storage.getBasketFromStorage();
  }

  async minus(product) {
    this.basket = await this.storage.getBasketFromStorage(); // duplicated
    this.basket.map((item) => {

      if(item.product._id == product._id) {
        console.log('product id are the same')
        console.log(item.amount)
        item.amount--; //// ????????
      }
      this.storage.refreshBasketStorage();
    });
  }

  async deleteProduct(product) {
    
    //console.log(this.state.products.filter(product => product._id != id))
    //видалити всі продукти по id
   /// this.basket = this.basket.filter(product => product._id != id);
    this.storage.refreshBasketStorage();
  }


  subTotalPrice(amount, price) {
    return amount * price;
  }

  totalPrice() {
    let total = 0; // need to show correct value when page is loading/opening the first time
    this.basket.map((product) => {
      //console.log(product.amount)
      total += product.product.price * product.amount;
      //console.log(total)
    })
    return total;
    //console.log(this.basket)
  }
}
