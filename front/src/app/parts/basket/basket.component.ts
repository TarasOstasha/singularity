import { Component, OnInit, Input } from '@angular/core';
import appState from '../../app-state';
import { StorageService } from '../../services/storage.service';
import { BasketService } from '../../services/basket.service';
import { ApiService } from '../../services/api.service';


@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.less']
})
export class BasketComponent implements OnInit {
  appState: any = appState
  basketView: any = [];


  checkoutMode: boolean = false;


  //@Input() appStateCard: any

  currentProductPrice: number;

  constructor(
    private storage: StorageService, 
    private basket: BasketService,  
    private api: ApiService
    ) { 

    }

  ngOnInit() {

    this.basketView = this.storage.getBasketFromStorage();
    console.log(this.basketView, 'products ng on init')
  }

  plus(product) {
    this.basketView = this.basket.plus(product);
  }

  minus(product) {
    this.basketView = this.basket.minus(product);
  }

  deleteProduct(id) {
    this.basketView = this.basket.deleteProduct(id);
  }

  addToFavorite(id) {
    this.appState.favoriteProducts.push(id);
    const fromServer = this.api.favoriteProduct(id);
    console.log(fromServer);
  }

  checkoutToggle() {
    let shoppingCard: any = document.querySelector('.shopping-cart');
    let shoppingCardHeight = shoppingCard.offsetHeight;
    setTimeout(() => {
      window.scrollTo(0, shoppingCardHeight + 200)
    }, 1000)
    this.checkoutMode = !this.checkoutMode;
  }



}
