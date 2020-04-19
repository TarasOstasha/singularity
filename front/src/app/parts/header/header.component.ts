import { Component, OnInit, ViewChild, ElementRef  } from '@angular/core';
import { Router } from '@angular/router';
import appState from '../../app-state';
import { ApiService } from '../../services/api.service';
import { StorageService } from '../../services/storage.service';


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
  
  constructor(  
    private router: Router,
    private api: ApiService,
    private storage: StorageService
  ) { }
  

  ngAfterViewInit() {
    //console.log(this.el.nativeElement.offsetWidth)
  }

  ngOnInit() {
    appState.header.user.userName = this.storage.getItem('user');
  }


  toLogin(){
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
    if( fromServer.ok ) {
      console.log('IF LOGOUT')
      // reset user
      this.storage.clearItem('user');
      location.reload();
    }
  }

  toogleIconHeader() {
    this.filterToogle = !this.filterToogle;
  }


}
