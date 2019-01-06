import { Component, OnInit } from '@angular/core';
import {Sake} from '../sake/sake'
import {SakeService} from '../sake.service'


@Component({
  selector: 'app-sake-list',
  templateUrl: './sake-list.component.html',
  styleUrls: ['./sake-list.component.css']
})
export class SakeListComponent implements OnInit {
  sakedata : Sake[];


  constructor(private rsv: SakeService) { }

  ngOnInit() {
    this.sakedata = this.rsv.getSakedata();
  }

  searchSake(keyword:string) {
    this.sakedata = this.rsv.searchSake(keyword);
    this.rsv.currentValue = keyword;

  }

  getCurrentValue() {
    return this.rsv.currentValue;
  }
}
