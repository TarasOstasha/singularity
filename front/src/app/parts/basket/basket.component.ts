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
  //@Input() appStateCard: any

  currentProductPrice: number;

  constructor(private storage: StorageService, private basket: BasketService) { }

  async ngOnInit() {
    this.appState.header.basket.products = await this.storage.getBasketFromStorage();
    console.log(this.appState.header.basket.products, 'products ng on init')
  }


}
