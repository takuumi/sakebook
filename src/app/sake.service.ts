import { Injectable } from '@angular/core';
import {Sake} from './sake/sake';
import {SAKEDATA} from './sake/sakedata';
import { AngularFirestore } from '@angular/fire/firestore'; // 追加
import { Observable } from 'rxjs'; // 追加

@Injectable({
  providedIn: 'root'
})
export class SakeService {


  sakedata:Sake[] = SAKEDATA;
  item: Observable<Comment>; // 追加

  currentValue:string = '';
//  constructor(){}
  constructor(db: AngularFirestore) {
    this.item = db
      .collection('sakebook')
      .doc<Comment>('item')
      .valueChanges();
  }
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
