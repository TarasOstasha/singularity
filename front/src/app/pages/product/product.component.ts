import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
import appState from '../../app-state';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.less']
})
export class ProductComponent implements OnInit {
  appState: any;
  currentCard = {};
  

  constructor(
    private api: ApiService,
    private route: ActivatedRoute,
  ) {
    this.appState = appState;
    
  }


  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('productId'); // get link
    console.log(id)
    this.getProductIdFromServer(id)
  }
  

  // get product id
  async getProductIdFromServer(id) {
    const fromServer: any = await this.api.getProduct(id);
    this.currentCard = fromServer.product;
    console.log(this.currentCard)
  }

}
