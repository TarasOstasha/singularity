import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { StorageService } from '../../services/storage.service';
import { BasketService } from '../../services/basket.service';
import appState from '../../app-state';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.less']
})
export class MainComponent implements OnInit {
  appState = appState;

  constructor(
    private api: ApiService,
    private storage: StorageService,
    private basket: BasketService
  ) { }

  ngOnInit() {
    setTimeout(()=>{
      console.log(this.appState)
    },500)
    
  }

  cardHandler(product) {
    console.log('return data', product);
    this.basket.plus(product); //додати продукт в корзину
    //this.storage.refreshBasketStorage();
    //  this.header_state.basket = this.state.basket; // передати 
  }

}
