import { Injectable } from '@angular/core';
import {Sake} from './sake/sake';
import {SAKEDATA} from './sake/sakedata';


@Injectable({
  providedIn: 'root'
})
export class SakeService {

  sakedata:Sake[] = SAKEDATA;

  currentValue:string = '';
  constructor() { }

  getSakedata():Sake[]{
    return this.sakedata;
  }

  getSake(id:string):Sake{
    return this.sakedata.find(sake=>sake.id.toString()==id);
  }

  searchSake(keyword: string): Sake[] {
    let resultArr : Sake[] = [];


    for (let sake of this.sakedata) {
      let sakeStr = JSON.stringify(sake);
      if (sakeStr.search(keyword) >=0) {
        resultArr.push(sake);
      }
    }
    return resultArr;

  }

}
