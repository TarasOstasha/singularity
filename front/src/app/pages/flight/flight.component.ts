import { Component, OnInit, HostListener, ElementRef, ViewChild, Input } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  host: {
    '(document:click)': 'onClick($event)',
  },
  selector: 'app-flight',
  templateUrl: './flight.component.html',
  styleUrls: ['./flight.component.less']
})
export class FlightComponent implements OnInit {
  public minDate: Date = new Date ("05/07/2017");
  public maxDate: Date = new Date ("08/27/2017");
  public value: Date = new Date ("05/16/2017");

  whereFrom: string;
  whereTo: string;
  localList: any;
  filteredLocalization: any;
  filteredLocalizationTo: any;
  cityFlag: any = false; // show/hide name of cities witch have been chosen when clicked
  cityFlagTo: any = false;

  departFlag: boolean = false;
  returnFlag: boolean = false;

  //resultCityFrom: any; // result of where from are you going to flight
  //resultCityTo: any; // result of where to are you going to flight

  constructor(private api: ApiService, private _eref: ElementRef) { }
  

  async ngOnInit() {
    const fromServer = await this.api.getLocalization();
    this.localList = fromServer;
    console.log(this.localList, 'this locallist')
  }

  filterLocalization() {
    try {
      if (this.whereFrom.length > 0) this.cityFlag = true;
      else this.cityFlag = false;
      this.filteredLocalization = this.localList.localization.Countries.filter((item) => {
        let flag = true;
        this.whereFrom.split('').forEach((letter, index ) => {
          
          if(letter == 'symbol enter') { // !!!
            this.setValue(this.filteredLocalization[0])
          }
          if (this.whereFrom.length <= item.Name.length) {
            if (letter.toLowerCase() !== item.Name[index].toLowerCase()) flag = false;
          } else {
            flag = false;
          }

        })
        return flag;
      })
    } catch (error) {
      console.log(error)
    }

  }

  filterLocalizationTo() {
    if (this.whereTo.length > 0) this.cityFlagTo = true;
      else this.cityFlagTo = false;
      this.filteredLocalizationTo = this.localList.localization.Countries.filter((item) => {
        let flag = true;
        this.whereTo.split('').forEach((letter, index ) => {
          
          if(letter == 'symbol enter') { // !!!
            this.setValue(this.filteredLocalization[0])
          }
          if (this.whereTo.length <= item.Name.length) {
            if (letter.toLowerCase() !== item.Name[index].toLowerCase()) flag = false;
          } else {
            flag = false;
          }

        })
        return flag;
      })
  }

  setValue(inpuVal: any) {
    this.whereFrom = inpuVal.Name;
    this.cityFlag = false;
  }

  setValueTo(inpuVal: any) {
    this.whereTo = inpuVal.Name;
    this.cityFlagTo = false;
  }

  departCalendar() {
    this.departFlag = !this.departFlag;
    if( this.departFlag == true ) this.returnFlag = false;
  }

  returnCalendar() {
    this.returnFlag = !this.returnFlag;
    if( this.returnFlag == true ) this.departFlag = false;
  }


  onClick(event) {
    const hostElem = this._eref.nativeElement;
    const searchFlights = hostElem.childNodes[0].childNodes[0].childNodes[0].contains(event.target);
    //const hostElem = this.el.nativeElement; // current element
    //console.log(hostElem.children/childNodes); // child element
    //console.log(hostElem.parentNode); // parent element
    if ( !searchFlights ) {
      this.departFlag = false;
      this.returnFlag = false;

    }
   }






  //if(key == 13) console.log('enter')

  ///////////
  
}
