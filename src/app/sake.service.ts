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
    // @@@mada
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
                trace("1");
                resultArr.push(sake);
                trace("2")
            }
        }
        return resultArr;
    }

    registerSakeDatabase(formdata:Sake) {
        this.itemsCollection.add(formdata);
    }
}



/*
    setSakedata(){
        SakeDataLists.forEach(element => {
            this.itemsCollection.add(element);      
        });
    }

const SakeDataLists: Sake[] = [   
  {
    id:1,
    name: "伯楽星 生酒 おりがらみ",
    type: "純米吟醸",
    rank:5,
    drink_start_date:new Date(2018,12,28),
    drink_end_date:new Date(2018,12,31),
    prefecture:"宮城県",
    amount:720,
    alcohol:16,
    bikou:""
},
{
    id:2,
    name: "獺祭 2割3分",
    type: "純米大吟醸",
    rank:5,
    drink_start_date:new Date(2019,1,1),
    drink_end_date:new Date(2019,1,4),    
    prefecture:"山口県",
    amount:720,
    alcohol:14,
    bikou:"加藤家からいただく"        
},
{
    id:3,
    name: "一白水成 槽垂れ 生酒",
    type: "純米大吟醸",
    rank:4,       
    drink_start_date:new Date(2018,12,28),
    drink_end_date:new Date(2018,12,31),  
    prefecture:"秋田県",
    amount:720,
    alcohol:16,
    bikou:""        
},
{
    id:4,
    name: "神聖 ３割５分磨き",
    type: "大吟醸原酒",
    rank:3,
    drink_start_date:new Date(2018,12,28),
    drink_end_date:new Date(2018,12,31), 
    prefecture:"京都府",
    amount:720,
    alcohol:17,
    bikou:"加藤家からいただく"        
},
{
    id:5,
    name: "伯楽星 生酒 おりがらみ",
    type: "純米吟醸",
    rank:5,
    drink_start_date:new Date(2019,1,1),
    drink_end_date:new Date(2019,1,10),  
    prefecture:"宮城県",
    amount:1800,
    alcohol:16,
    bikou:""
},
{
    id:6,
    name: "あたごのまつ ささら",
    type: "純米吟醸",
    rank:3,
    drink_start_date:new Date(2019,1,1),
    drink_end_date:new Date(2019,1,6),  
    prefecture:"宮城県",
    amount:720,
    alcohol:16,
    bikou:""
},
{
    id:7,
    name: "ゆきの美人",
    type: "純米大吟醸",
    rank:4,
    drink_start_date:new Date(2019,1,12),
    drink_end_date:new Date(2019,1,14),  
    prefecture:"秋田県",
    amount:720,
    alcohol:16,
    bikou:"味は・・・"
},   
{
    id:8,
    name: "ゆきの美人 愛山 6号酵母",
    type: "純米吟醸",
    rank:5,
    drink_start_date:new Date(2019,1,12),
    drink_end_date:new Date(2019,1,14),  
    prefecture:"秋田県",
    amount:720,
    alcohol:16,
    bikou:""
},   
{
    id:9,
    name: "鳳凰美田 supreme",
    type: "純米大吟醸",
    rank:5,
    drink_start_date:new Date(2019,1,12),
    drink_end_date:new Date(2019,1,14),  
    prefecture:"栃木県",
    amount:720,
    alcohol:16,
    bikou:""
},   
{
    id:10,
    name: "獺祭　磨き　その先へ",
    type: "純米大吟醸",
    rank:5,
    drink_start_date:new Date(2019,1,14),
    drink_end_date:new Date(2019,1,25),  
    prefecture:"山口県",
    amount:720,
    alcohol:16,
    bikou:""
},   
{
    id:11,
    name: "獺祭",
    type: "純米大吟醸",
    rank:5,
    drink_start_date:new Date(2019,1,14),
    drink_end_date:new Date(2019,1,20),  
    prefecture:"山口県",
    amount:720,
    alcohol:16,
    bikou:""
},   
{
    id:12,
    name: "廣戸川",
    type: "純米",
    rank:3,
    drink_start_date:new Date(2019,1,19),
    drink_end_date:new Date(2019,1,20),  
    prefecture:"福島県",
    amount:720,
    alcohol:15,
    bikou:"酒の山本、家飲み応援クラブ"
},   
{
    id:13,
    name: "松の司",
    type: "純米吟醸",
    rank:3,
    drink_start_date:new Date(2019,1,19),
    drink_end_date:new Date(2019,1,26),  
    prefecture:"滋賀県",
    amount:720,
    alcohol:16,
    bikou:"酒の山本、家飲み応援クラブ"
},
{
    id:14,
    name: "NEXT FIVE",
    type: "生酛大純米吟醸",
    rank:5,
    drink_start_date:new Date(2019,1,26),
    drink_end_date:new Date(2019,1,27),  
    prefecture:"秋田県",
    amount:720,
    alcohol:16,
    bikou:"へうけもの　ぐい呑付き"
},   
{
    id:15,
    name: "春霞　栗ラベル",
    type: "純米吟醸",
    rank:3,
    drink_start_date:new Date(2019,1,26),
    drink_end_date:new Date(2019,1,27),  
    prefecture:"秋田県",
    amount:720,
    alcohol:16,
    bikou:""
},
{
    id:16,
    name: "写楽",
    type: "純米吟醸　無濾過生",
    rank:4,
    drink_start_date:new Date(2019,2,2),
    drink_end_date:new Date(2019,2,3),  
    prefecture:"福島県",
    amount:720,
    alcohol:16,
    bikou:""
},
{
    id:17,
    name: "鳳凰美田",
    type: "純米吟醸　無濾過本生　black phenix",
    rank:5,
    drink_start_date:new Date(2019,2,2),
    drink_end_date:new Date(2019,2,3),  
    prefecture:"栃木県",
    amount:720,
    alcohol:16,
    bikou:""
},    
{
    id:18,
    name: "くどき上手",
    type: "純米大吟醸　出羽の里４８％",
    rank:3,
    drink_start_date:new Date(2019,2,9),
    drink_end_date:new Date(2019,2,10),  
    prefecture:"山形県",
    amount:720,
    alcohol:17,
    bikou:""
},    
{
    id:19,
    name: "金稜の郷",
    type: "手造り 純米大吟醸",
    rank:2,
    drink_start_date:new Date(2019,2,9),
    drink_end_date:new Date(2019,2,10),  
    prefecture:"香川県",
    amount:720,
    alcohol:14,
    bikou:""
},    
{
    id:20,
    name: "一白水成",
    type: "純米大吟醸 35% 秋田酒こまち",
    rank:4,
    drink_start_date:new Date(2019,2,9),
    drink_end_date:new Date(2019,2,10),  
    prefecture:"秋田県",
    amount:720,
    alcohol:16,
    bikou:""
},    
{
    id:21,
    name: "伯楽星",
    type: "純米大吟醸",
    rank:5,
    drink_start_date:new Date(2019,2,9),
    drink_end_date:new Date(2019,2,10),  
    prefecture:"宮城県",
    amount:720,
    alcohol:16,
    bikou:""
},    
{
    id:22,
    name: "黒龍",
    type: "大吟醸 FINALFANTASY BRAVE EXVIUS",
    rank:5,
    drink_start_date:new Date(2019,2,14),
    drink_end_date:new Date(2019,2,14),  
    prefecture:"福井県",
    amount:720,
    alcohol:15,
    bikou:""
},    
{
    id:23,
    name: "伯楽星",
    type: "特別純米",
    rank:4,
    drink_start_date:new Date(2019,2,18),
    drink_end_date:new Date(2019,2,19),  
    prefecture:"宮城県",
    amount:720,
    alcohol:16,
    bikou:""
},    
{
    id:24,
    name: "鳳凰美田　初しぼり",
    type: "純米吟醸酒",
    rank:4,
    drink_start_date:new Date(2019,2,18),
    drink_end_date:new Date(2019,2,19),  
    prefecture:"茨城県",
    amount:720,
    alcohol:16,
    bikou:""
},  
{
    id:25,
    name: "而今",
    type: "純米吟醸酒",
    rank:5,
    drink_start_date:new Date(2019,2,23),
    drink_end_date:new Date(2019,2,24),  
    prefecture:"三重県",
    amount:720,
    alcohol:16,
    bikou:"酒の山本家飲み応援クラブ２月"
},  
{
    id:26,
    name: "鳳凰美田　初しぼり",
    type: "純米吟醸酒",
    rank:4,
    drink_start_date:new Date(2019,2,23),
    drink_end_date:new Date(2019,2,24),  
    prefecture:"茨城県",
    amount:720,
    alcohol:16,
    bikou:"酒の山本家飲み応援クラブ２月"
},    
{
    id:27,
    name: "冩楽 播州山田錦",
    type: "純米吟醸酒",
    rank:4,
    drink_start_date:new Date(2019,3,1),
    drink_end_date:new Date(2019,3,2),  
    prefecture:"福島県",
    amount:720,
    alcohol:16,
    bikou:""
},    
{
    id:28,
    name: "一白水星 袋吊り",
    type: "純米吟醸酒",
    rank:4,
    drink_start_date:new Date(2019,3,1),
    drink_end_date:new Date(2019,3,2),  
    prefecture:"秋田県",
    amount:720,
    alcohol:16,
    bikou:""
},
{
    id:29,
    name: "加茂錦",
    type: "純米大吟醸酒",
    rank:4,
    drink_start_date:new Date(2019,3,1),
    drink_end_date:new Date(2019,3,6),  
    prefecture:"新潟県",
    amount:720,
    alcohol:16,
    bikou:""
},
{
    id:30,
    name: "田酒 百四拾",
    type: "純米吟醸酒",
    rank:3,
    drink_start_date:new Date(2019,3,14),
    drink_end_date:new Date(2019,3,17),  
    prefecture:"山口県",
    amount:720,
    alcohol:16,
    bikou:""
},        
{
    id:31,
    name: "獺祭 船場汲み 無濾過 磨き3割9分",
    type: "純米大吟醸酒",
    rank:5,
    drink_start_date:new Date(2019,3,14),
    drink_end_date:new Date(2019,3,17),  
    prefecture:"愛知県",
    amount:720,
    alcohol:16,
    bikou:""
},        
{
    id:32,
    name: "醸し人九平次 黒田庄産 山田錦",
    type: "純米大吟醸酒",
    rank:4,
    drink_start_date:new Date(2019,3,14),
    drink_end_date:new Date(2019,3,17),  
   prefecture:"山口県",
    amount:720,
    alcohol:16,
    bikou:""
},    
{
    id:33,
    name: "黒龍 垂れ口",
    type: "純米吟醸酒",
    rank:4,
    drink_start_date:new Date(2019,3,16),
    drink_end_date:new Date(2019,3,17),  
    prefecture:"福井県",
    amount:720,
    alcohol:17,
    bikou:"家飲みクラブ"
},        
{
    id:34,
    name: "鬼熊",
    type: "純米吟醸酒",
    rank:3,
    drink_start_date:new Date(2019,3,16),
    drink_end_date:new Date(2019,3,17),  
    prefecture:"奈良県",
    amount:720,
    alcohol:17,
    bikou:""
},    
{
    id:35,
    name: "一白水成",
    type: "純米吟醸酒",
    rank:4,
    drink_start_date:new Date(2019,3,17),
    drink_end_date:new Date(2019,3,21),  
    prefecture:"秋田県",
    amount:720,
    alcohol:16,
    bikou:""
},   
{
    id:36,
    name: "紀土",
    type: "純米　春の燻製",
    rank:3,
    drink_start_date:new Date(2019,3,22),
    drink_end_date:new Date(2019,3,23),  
    prefecture:"和歌山県",
    amount:720,
    alcohol:15,
    bikou:""
},   
{
    id:37,
    name: "春霞　限定瓶囲い",
    type: "純米吟醸酒",
    rank:3,
    drink_start_date:new Date(2019,3,22),
    drink_end_date:new Date(2019,3,23),  
    prefecture:"秋田県",
    amount:720,
    alcohol:16,
    bikou:""
},   
{
    id:38,
    name: "伯楽星　社下久米産",
    type: "純米大吟醸酒",
    rank:5,
    drink_start_date:new Date(2019,3,23),
    drink_end_date:new Date(2019,3,26),  
    prefecture:"宮城県",
    amount:720,
    alcohol:16,
    bikou:"29%"
},
{
    id:39,
    name: "出雲富士　山田錦100% 赤ラベル",
    type: "純米吟醸酒",
    rank:3,
    drink_start_date:new Date(2019,3,30),
    drink_end_date:new Date(2019,3,31),  
    prefecture:"島根県",
    amount:720,
    alcohol:16,
    bikou:""
},   
{
    id:40,
    name: "荷札酒　月白",
    type: "純米大吟醸酒",
    rank:5,
    drink_start_date:new Date(2019,3,30),
    drink_end_date:new Date(2019,3,31),  
    prefecture:"新潟県",
    amount:720,
    alcohol:15,
    bikou:""
},   
{
    id:41,
    name: "鳳凰美田　無濾過本生",
    type: "純米吟醸酒",
    rank:5,
    drink_start_date:new Date(2019,3,30),
    drink_end_date:new Date(2019,3,31),  
    prefecture:"栃木県",
    amount:720,
    alcohol:16,
    bikou:""
},   
{
    id:42,
    name: "東洋美人　壱番纏",
    type: "純米大吟醸酒",
    rank:5,
    drink_start_date:new Date(2019,4,5),
    drink_end_date:new Date(2019,4,7),  
    prefecture:"山口県",
    amount:720,
    alcohol:15,
    bikou:""
},   
{
    id:43,
    name: "獺祭　磨き二割三分",
    type: "純米大吟醸酒",
    rank:5,
    drink_start_date:new Date(2019,4,5),
    drink_end_date:new Date(2019,4,7),  
    prefecture:"山口県",
    amount:720,
    alcohol:16,
    bikou:""
},   
{
    id:44,
    name: "田酒　山田錦100%",
    type: "純米吟醸酒",
    rank:3,
    drink_start_date:new Date(2019,4,5),
    drink_end_date:new Date(2019,4,7),  
    prefecture:"青森県",
    amount:720,
    alcohol:16,
    bikou:""
},   
{
    id:45,
    name: "松の司　楽",
    type: "純米吟醸酒",
    rank:3,
    drink_start_date:new Date(2019,4,7),
    drink_end_date:new Date(2019,4,12),  
    prefecture:"滋賀県",
    amount:720,
    alcohol:15,
    bikou:""
},
{
    id:46,
    name: "鷹長",
    type: "菩堤もと純米酒",
    rank:3,
    drink_start_date:new Date(2019,4,12),
    drink_end_date:new Date(2019,4,13),  
    prefecture:"奈良県",
    amount:720,
    alcohol:17,
    bikou:""
},
{
    id:47,
    name: "AKABU 愛山",
    type: "純米吟醸酒",
    rank:4,
    drink_start_date:new Date(2019,4,12),
    drink_end_date:new Date(2019,4,13),  
    prefecture:"滋賀県",
    amount:720,
    alcohol:15,
    bikou:""
},   
{
    id:48,
    name: "伯楽星",
    type: "純米吟醸酒",
    rank:5,
    drink_start_date:new Date(2019,4,12),
    drink_end_date:new Date(2019,4,13),  
    prefecture:"滋賀県",
    amount:720,
    alcohol:16,
    bikou:""
},
{
    id:49,
    name: "冩楽　備前雄町",
    type: "純米吟醸酒",
    rank:5,
    drink_start_date:new Date(2019,4,21),
    drink_end_date:new Date(2019,4,21),  
    prefecture:"福島県",
    amount:720,
    alcohol:16,
    bikou:""
},
{
    id:50,
    name: "磯自慢　大吟醸酒純米　酒友",
    type: "純米大吟醸酒",
    rank:5,
    drink_start_date:new Date(2019,4,26),
    drink_end_date:new Date(2019,4,30),  
    prefecture:"静岡県",
    amount:720,
    alcohol:16,
    bikou:""
},
{
    id:51,
    name: "ゆきの美人",
    type: "純米吟醸酒",
    rank:5,
    drink_start_date:new Date(2019,4,26),
    drink_end_date:new Date(2019,4,30),  
    prefecture:"秋田県",
    amount:720,
    alcohol:16,
    bikou:""
},
{
    id:52,
    name: "秋田春霞",
    type: "純米吟醸酒",
    rank:3,
    drink_start_date:new Date(2019,4,26),
    drink_end_date:new Date(2019,4,30),  
    prefecture:"秋田県",
    amount:720,
    alcohol:16,
    bikou:""
},
{
    id:53,
    name: "澤屋まつもと　守破離　山田錦",
    type: "純米吟醸酒",
    rank:4,
    drink_start_date:new Date(2019,5,1),
    drink_end_date:new Date(2019,5,3),  
    prefecture:"京都府",
    amount:720,
    alcohol:15,
    bikou:""
},
{
    id:54,
    name: "AKABU 純米吟醸",
    type: "純米吟醸酒",
    rank:3,
    drink_start_date:new Date(2019,5,1),
    drink_end_date:new Date(2019,5,3),  
    prefecture:"岩手県",
    amount:720,
    alcohol:15,
    bikou:""
},
{
    id:55,
    name: "楯野川　限定流通品",
    type: "純米大吟醸酒",
    rank:4,
    drink_start_date:new Date(2019,5,1),
    drink_end_date:new Date(2019,5,5),  
    prefecture:"山形県",
    amount:720,
    alcohol:15,
    bikou:""
},
{
    id:56,
    name: "羽根屋 純米大吟醸５０　翼",
    type: "純米大吟醸酒",
    rank:4,
    drink_start_date:new Date(2019,5,1),
    drink_end_date:new Date(2019,5,3),  
    prefecture:"富山県",
    amount:720,
    alcohol:15,
    bikou:""
},
{
    id:57,
    name: "東一",
    type: "純米大吟醸酒",
    rank:5,
    drink_start_date:new Date(2019,5,7),
    drink_end_date:new Date(2019,5,7),  
    prefecture:"佐賀県",
    amount:720,
    alcohol:15,
    bikou:""
},
{
    id:58,
    name: "出雲富士生酒　純米大吟醸酒",
    type: "純米大吟醸酒",
    rank:3,
    drink_start_date:new Date(2019,5,11),
    drink_end_date:new Date(2019,5,12),  
    prefecture:"島根県",
    amount:720,
    alcohol:16,
    bikou:""
},
{
    id:59,
    name: "ゆきの美人",
    type: "純米吟醸酒 改良信交",
    rank:5,
    drink_start_date:new Date(2019,5,18),
    drink_end_date:new Date(2019,5,19),  
    prefecture:"秋田県",
    amount:720,
    alcohol:16,
    bikou:""
},
{
    id:60,
    name: "山川光男",
    type: "純米大吟醸酒　",
    rank:5,
    drink_start_date:new Date(2019,5,18),
    drink_end_date:new Date(2019,5,19),  
    prefecture:"山形県",
    amount:720,
    alcohol:16,
    bikou:"精米歩合３２％。２０１９年プレミアム。"
},
{
    id:61,
    name: "愛宕の松　ひと夏の恋",
    type: "純米吟醸酒",
    rank:3,
    drink_start_date:new Date(2019,5,25),
    drink_end_date:new Date(2019,5,26),  
    prefecture:"宮城県",
    amount:720,
    alcohol:16,
    bikou:""
},
{
    id:62,
    name: "冩楽　夏吟 うすにごり",
    type: "純米吟醸酒",
    rank:5,
    drink_start_date:new Date(2019,5,25),
    drink_end_date:new Date(2019,5,26),  
    prefecture:"福島県",
    amount:720,
    alcohol:16,
    bikou:""
}

]

    */

