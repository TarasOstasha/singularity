import { Pipe, PipeTransform } from '@angular/core';
import appState from '../app-state';

@Pipe({
  name: 'parseArray'
})
export class ParseArrayPipe implements PipeTransform {
    appState = appState;
  constructor() {
    
  }

  transform(value: any, ...args: any[]): any {
    let item = this.appState.products.forEach((item) => {
      return item
    })
    return item;
  }

}
