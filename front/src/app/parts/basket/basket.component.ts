import { Component, OnInit, Input } from '@angular/core';
import appState from '../../app-state';
import { StorageService } from '../../services/storage.service';
import { BasketService } from '../../services/basket.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.less']
})
export class BasketComponent implements OnInit {
  appState: any = appState
  basketView: any = [];

  //@Input() appStateCard: any

  currentProductPrice: number;

  constructor(private storage: StorageService, private basket: BasketService) { }

  ngOnInit() {

    this.basketView = this.storage.getBasketFromStorage();
    console.log(this.basketView, 'products ng on init')
  }

  plus(product) {
    this.basketView = this.basket.plus(product);
  }

  minus() {

  }



}
