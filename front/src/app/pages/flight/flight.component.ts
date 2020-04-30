import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-flight',
  templateUrl: './flight.component.html',
  styleUrls: ['./flight.component.less']
})
export class FlightComponent implements OnInit {
  whereFrom: string;
  whereTo: string;
  localList: any;
  filteredLocalization: any;
  filteredLocalizationTo: any;
  cityFlag: any = false; // show/hide name of cities witch have been chosen when clicked

  resultCityFrom: any; // result of where from are you going to flight
  resultCityTo: any; // result of where to are you going to flight

  constructor(private api: ApiService) { }

  async ngOnInit() {
    const fromServer = await this.api.getLocalization();
    this.localList = fromServer;
    console.log(this.localList, 'this locallist') 
  }

  filterLocalization() {
      
    //this.filteredLocalization = this.localList.localization.Countries;//.filter((item) => {
      //return item.Name.toLowerCase() == this.whereFrom.toLowerCase();
    //})

    this.filteredLocalization = this.localList.localization.Countries.filter((item) => {
      this.resultCityFrom = item.Name == this.whereFrom || item.Code == this.whereFrom; 
      if(this.resultCityFrom) {
        this.cityFlag = false;
        console.log(this.resultCityFrom, this.cityFlag, this.whereFrom)
      }
      return this.resultCityFrom;
    })
  }

  filterLocalizationTo() {
    this.filteredLocalizationTo = this.localList.localization.Countries.filter((item) => {
      return item.Name == this.whereTo ||
             item.Code == this.whereTo
    })
  }

  setValue(event: any, inpuVal: any) {
    this.resultCityFrom = event.target.value;
    this.cityFlag = true;
  }

}
