//@@@mada
export class Saketemp {
    id:number;
    name: string;
    type: string;
    rank:number;
    drink_start_date:string;
    drink_end_date:string;
    prefecture:string;
    amount:number;
    alcohol:number;
    bikou:string;
} 

export interface Sake {
    id:number;
    name: string;
    type: string;
    rank:number;
    drink_start_date:Date;
    drink_end_date:Date;
    prefecture:string;
    amount:number;
    alcohol:number;
    bikou:string;
  }
  