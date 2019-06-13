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

  // @@@ detailに移動
  //profileUrl: Observable<string | null>;

  // @@@ detailに移動
   // const ref = this.storage.ref('sakebook_pics/main.png');
   // this.profileUrl = ref.getDownloadURL();


  ngOnInit() {
    this.sakeid = this.route.snapshot.paramMap.get('id');
    this.sake = this.rsv.getSake(this.sakeid);
  }

  backToList() {
    this.location.back();
  }

}
