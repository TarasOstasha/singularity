import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import appState from '../../app-state';
import { ApiService } from '../../services/api.service';
import { StorageService } from '../../services/storage.service';
import { Subject, Observable, pipe } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { BasketService } from '../../services/basket.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})


export class HeaderComponent implements OnInit {
  //@ViewChild('nav', {static: true} ) el: ElementRef;

  //headerMenuFlag: boolean = true;
  //public navMenu: any;


  appState = appState;
  userStorage: any;
  filterToogle: boolean = true;
  search_value: string;
  searchedProducts: boolean = false;
  
  // header input
  // 1
  myObservable = new Subject<string>(); // create new observable

  // filter bar input
  // 1
  filterBarObservable = new Subject<string>();

  constructor(
    private router: Router,
    private api: ApiService,
    private storage: StorageService,
    private basket: BasketService
  ) {
    // 2 
    this.rxFilter(this.myObservable)
      .subscribe(results => { // subscribe
        let filteredProducts: any = results;
        this.appState.products = filteredProducts.data;
        console.log(results);
      });

        // filter bar input
  // 2
  }


  // 3
  rxFilter(myObservable: Observable<string>) {
    return myObservable.pipe( // received value per click
      debounceTime(400), //delay time
      distinctUntilChanged(), // 
      switchMap(query => this.api.getSearchData(query))
    )
  }





  ngAfterViewInit() {
    //console.log(this.el.nativeElement.offsetWidth)
  }

  async ngOnInit() {
    appState.header.user.userName = this.storage.getItem('user');
    //setInterval(() => {
      //console.log(this.basket.productQuantity())
      console.log(this.basket.basket = await this.storage.getBasketFromStorage())
   // },2000)
  }

  onKey() {
    //if(this.search_value.length > 0) this.searchedProducts = 'block';
    console.log(this.search_value.length)
  }


  toLogin() {
    // save page to redirector
    const currentPage = location.pathname
    localStorage.setItem('toRedirect', currentPage);
    // redirect to login
    this.router.navigateByUrl('/auth');
  }

  async logOut() {
    console.log('log out')
    const fromServer: any = await this.api.logOut();
    console.log(fromServer, fromServer.ok)
    if (fromServer.ok) {
      console.log('IF LOGOUT')
      // reset user
      this.storage.clearItem('user');
      location.reload();
    }
  }

  toogleIconHeader() {
    this.filterToogle = !this.filterToogle;

    // hide searched products and clear input value
    if( this.filterToogle == false )  this.searchedProducts = true;  
    else  this.search_value = ''; 

  }




}
