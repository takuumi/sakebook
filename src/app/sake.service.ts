import { Injectable } from '@angular/core';

import {Sake} from './sake/sake';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';

import { Observable } from 'rxjs';

/** デバッグモードかどうか。本番公開時にはfalseにする */
const DEBUG_MODE:boolean = true;

/**
 * デバッグモードが有効で、console.log()が使える時に、
 * コンソールに文字列を出力します。
 * @param {string[]} ...args 出力したい文字列です。
 */
function trace(...args:any[]):void {
    if (DEBUG_MODE && window.console && typeof window.console.log != "undefined") {
        let str:string = "";
        if (args.length > 0)
            str = args.join(", ");

        console.log(str);
    }
}

@Injectable({
  providedIn: 'root'
})
export class SakeService {

    /** 取得したコレクションを格納 */
    private itemsCollection: AngularFirestoreCollection<Sake>;
    
    sakedata: Sake[];

    currentValue:string = '';
    constructor(db: AngularFirestore) {
        this.itemsCollection = db.collection<Sake>('sakebook');
    }

    InitializeService():Observable<Sake[]>{
        return this.itemsCollection.valueChanges();
    }

    getSakedata():Sake[]{
        return this.sakedata;
    }

    setSakedata(tmp:Sake[]){
        this.sakedata = tmp;
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

    registerSakeDatabase(formdata:Sake) {
        this.itemsCollection.add(formdata);
    }
}
