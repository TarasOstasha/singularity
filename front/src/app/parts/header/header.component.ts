import { Component, OnInit, ViewChild, ElementRef  } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})


export class HeaderComponent implements OnInit {
  //@ViewChild('nav', {static: true} ) el: ElementRef;

  //headerMenuFlag: boolean = true;
  //public navMenu: any;
 
  
  

  constructor() { }

  ngAfterViewInit() {
    //console.log(this.el.nativeElement.offsetWidth)
  }

  ngOnInit() {
  
  }


}
