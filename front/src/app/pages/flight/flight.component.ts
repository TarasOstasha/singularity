import { Component, OnInit, HostListener, ElementRef, ViewChild, Input, OnChanges, AfterViewInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { ReturnStatement } from '@angular/compiler';

@Component({
  host: {
    '(document:click)': 'onClick($event)',
  },
  selector: 'app-flight',
  templateUrl: './flight.component.html',
  styleUrls: ['./flight.component.less']
})
export class FlightComponent implements OnInit, OnChanges {
  // public minDate: Date = new Date ("05/07/2017");
  // public maxDate: Date = new Date ("08/27/2017");
  // public value: Date = new Date ("05/16/2017");

  public month: number = new Date().getMonth(); // get month
  public fullYear: number = new Date().getFullYear(); // get year
  public minDate: Date = new Date(this.fullYear, this.month); // set min value in calendar
  public maxDate: Date = new Date(this.fullYear, this.month + (12 - this.month)); // set max value in calendar
  public value;
  //public dateValue: Date = new Date(this.fullYear, this.month , 11); // probably clicked value !!!




  whereFrom: string;
  whereTo: string;
  localList: any;
  depart: any;
  return: any;
  placeIdTo: any;
  placeIdReturn: any;

  filteredLocalization: any;
  filteredLocalizationTo: any;
  cityFlag: any = false; // show/hide name of cities witch have been chosen when clicked
  cityFlagTo: any = false;

  departFlag: boolean = false;
  returnFlag: boolean = false;

  //value: number;


  constructor(private api: ApiService, private _eref: ElementRef) { }
  //@Input() calendarVal;

  ngOnChanges() {
    console.log(this.value)
  }

  ngAfterViewInit() {
    console.log(this.value);
  }

  async ngOnInit() {

    const fromServer = await this.api.getLocalization();
    this.localList = fromServer;
    console.log(this.localList, 'this locallist')
  }

  allPlacesList: any = {}
  filterLocalization() {
    try {
      if (this.whereFrom.length > 0) this.cityFlag = true;
      else this.cityFlag = false;
      this.filteredLocalization = this.localList.localization.Countries.filter((item) => {
        let flag = true;
        this.whereFrom.split('').forEach((letter, index) => {

          if (letter == 'symbol enter') { // !!!
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
      this.filteredLocalization.forEach((item) => {
        if (this.whereFrom.length > 2) {
          this.api.getListPlaces({ country: item.Name }).then((fromServer: any) => {
            this.allPlacesList[item.Name] = fromServer.data;
            console.log(this.allPlacesList)
          })
        }
      })
    } catch (error) {
      console.log(error)
    }

  }

  filterLocalizationTo() {
    try {
      if (this.whereTo.length > 0) this.cityFlagTo = true;
      else this.cityFlagTo = false;
      this.filteredLocalizationTo = this.localList.localization.Countries.filter((item) => {
        let flag = true;
        this.whereTo.split('').forEach((letter, index) => {

          if (letter == 'symbol enter') { // !!!
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
      this.filteredLocalizationTo.forEach((item) => {
        if (this.whereTo.length > 2) {
          this.api.getListPlaces({ country: item.Name }).then((fromServer: any) => {
            this.allPlacesList[item.Name] = fromServer.data;
            console.log(this.allPlacesList)
          })
        }
      })
    } catch (error) {
      console.log(error)
    }

  }

  setValue(inpuVal: any) {
    this.placeIdTo = inpuVal.PlaceId;
    this.whereFrom = inpuVal.PlaceName;
    this.cityFlag = false;
  }

  setValueTo(inpuVal: any) {
    this.placeIdReturn = inpuVal.PlaceId;
    this.whereTo = inpuVal.PlaceName;
    this.cityFlagTo = false;
  }

  departCalendar() {
    this.departFlag = !this.departFlag;
    if (this.departFlag == true) this.returnFlag = false;
  }

  returnCalendar() {
    this.returnFlag = !this.returnFlag;
    if (this.returnFlag == true) this.departFlag = false;
  }

  // hide calendar when clicked on another area 
  onClick(event) {
    const hostElem = this._eref.nativeElement;
    const searchFlights = hostElem.childNodes[0].childNodes[0].childNodes[0].contains(event.target);
    //const hostElem = this.el.nativeElement; // current element
    //console.log(hostElem.children/childNodes); // child element
    //console.log(hostElem.parentNode); // parent element
    if (!searchFlights) {
      this.departFlag = false;
      this.returnFlag = false;

    }
  }



  addDepartDate(date) {
    console.log(date)
    const dateObj = new Date(date.target.title);
    const formatedData = dateObj.toISOString().substring(0, 10);
    //console.log(dateObj.toISOString());
    this.value = formatedData;
    this.depart = this.value;
  }

  addReturnDate(date) {
    console.log(date)
    const dateObj = new Date(date.target.title);
    const formatedData = dateObj.toISOString().substring(0, 10);
    this.value = formatedData;
    this.return = this.value;
  }

  flightData = {
    departingFlight: {
      Places: [],
      Dates: [],
      Quotes: [],
      Carriers: [],
      Currencies: []
    },
    returningFlight: {
      Places: [],
      Dates: [],
      Quotes: [],
      Carriers: [],
      Currencies: []
    }
  }
  outputFlag: boolean = false;

  async browseData() {
    console.log(this.allPlacesList.item)
    const requestData = {
      departDate: this.depart,
      returnDate: this.return,
      whereTo: this.whereTo,
      whereFrom: this.whereFrom,
      placeIdTo: this.placeIdTo,
      placeIdReturn: this.placeIdReturn

    }
    const fromServer: any = await this.api.browseData(requestData);
    console.log(fromServer.data);
    this.flightData = fromServer.data;
    this.outputFlag = true;
  }

  // ???
  // async getlistPlaces(country) {
  //   const fromServer: any = await this.api.getListPlaces({ country });
  //   console.log(fromServer);
  //   return fromServer.data
  // }


  // questions; 
  // 289 line in index.js SFO-sky/LAX-sky ???
  // browseData - jast one event, we need to get depart and return value
  // list place
  //if(key == 13) console.log('enter')

  ///////////

}
