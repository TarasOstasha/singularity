import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.less']
})
export class CardComponent implements OnInit {

  constructor(private api: ApiService) { }

  ngOnInit() {
  }

  async test() {
    const fromServer = await this.api.test()
    console.log(fromServer);
  }

}
