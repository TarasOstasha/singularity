import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-flight',
  templateUrl: './flight.component.html',
  styleUrls: ['./flight.component.less']
})
export class FlightComponent implements OnInit {
  whereFrom: string;
  localList: any;
  filteredLocalization: any;

  constructor(private api: ApiService) { }

  async ngOnInit() {
    this.localList = await this.api.getLocalization();
    console.log(this.localList) 
  }

  filterLocalization() {
    this.filteredLocalization = this.localList.Countries.filter((item) => {
      return item.Name.toLowerCase() == this.whereFrom.toLowerCase();
    })

  }

}
