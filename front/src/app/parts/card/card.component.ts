import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../../services/api.service';
import appState from '../../app-state';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.less']
})
export class CardComponent implements OnInit {
  appState: any;

  constructor(private api: ApiService) {
    this.appState = appState;
  }

  productData = 
    {
      productName: 'example',
      categories: 'example',
      price: 100,
      description: 'lorem djsfnkdsn kj kdnsfjkndsjfn  jfndsjkfndsjk njn',
      imgs: ['https://images.unsplash.com/photo-1496979551903-46e46589a88b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=cda12b505afa1beb06e49d89014cbd65&auto=format&fit=crop&w=634&q=80'],
      sizes: ['4'],
      views: 3,
      breadCrumbs: [],
      favoriteProducts: []
    }


  ngOnInit() {
    this.createFirstProduct();
  }

  async test() {
    const fromServer = await this.api.test()
    console.log(fromServer);
  }


  async createFirstProduct() {
    try {
      const fromServer: any = await this.api.product(this.productData);
      console.log(fromServer);
      this.appState.products = fromServer;
    } catch (error) {
      console.log(error);
    }
  }


}
