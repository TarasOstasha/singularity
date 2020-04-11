import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-redirector',
  templateUrl: './redirector.component.html',
  styleUrls: ['./redirector.component.less']
})
export class RedirectorComponent implements OnInit {

  constructor( private router: Router ) { }

  ngOnInit() {
    // oage wich should be redirect
    const page =  localStorage.getItem('toRedirect');
    this.router.navigateByUrl(page);
  }

}
