import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { StorageService } from '../../services/storage.service';
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
    private storage: StorageService
  ) { }

  ngOnInit() {
    setTimeout(()=>{
      console.log(this.appState)
    },500)
    
  }

}
