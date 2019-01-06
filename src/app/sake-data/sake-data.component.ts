import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Location} from '@angular/common';
import {Sake} from '../sake/sake';
import {SakeService} from '../sake.service'


@Component({
  selector: 'app-sake-data',
  templateUrl: './sake-data.component.html',
  styleUrls: ['./sake-data.component.css']
})
export class SakeDataComponent implements OnInit {
  sakeid:string;
  sake:Sake;
  constructor(private route:ActivatedRoute, private location:Location, private rsv:SakeService) { }

  ngOnInit() {
    this.sakeid = this.route.snapshot.paramMap.get('id');
    this.sake = this.rsv.getSake(this.sakeid);
  }

  backToList() {
    this.location.back();
  }

}
