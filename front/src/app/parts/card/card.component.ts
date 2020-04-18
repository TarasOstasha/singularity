import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ApiService } from '../../services/api.service';
import appState from '../../app-state';
import { ActivatedRoute } from '@angular/router';
import { Pipe, PipeTransform } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.less']
})
@Pipe({
  name: 'parseArray'
})
export class CardComponent implements OnInit {
  appState: any;

  @Output() onChanged = new EventEmitter<any>();
  @Input() appStateCard: any;

  constructor(private api: ApiService, private route: ActivatedRoute) {
    this.appState = appState;
  }

  // productData = 
  //   {
  //     productName: 'example',
  //     categories: 'example',
  //     price: 100,
  //     description: 'lorem djsfnkdsn kj kdnsfjkndsjfn  jfndsjkfndsjk njn',
  //     imgs: ['https://images.unsplash.com/photo-1496979551903-46e46589a88b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=cda12b505afa1beb06e49d89014cbd65&auto=format&fit=crop&w=634&q=80'],
  //     sizes: ['4'],
  //     views: 3,
  //     breadCrumbs: [],
  //     favoriteProducts: [Ź
  //   }


  ngOnInit() {
  
    //this.createFirstProduct();
  }

  readMoreInfo(element) {
    const n = this.onChanged.emit(this.appStateCard);
    console.log(n)
  }




  // async getProduct(id) {
  //   const fromServer: any = await this.api.getProduct(id)
  //   appState.products = fromServer.products;
  
  // }

  // test() {
  //   let id = this.route.snapshot.paramMap.get('productId')
  //   console.log(id);
  // }

}
