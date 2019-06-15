import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Location} from '@angular/common';
import {Sake} from '../sake/sake';
import {SakeService} from '../sake.service'
import { AngularFireStorage } from 'angularfire2/storage';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-sake-data',
  templateUrl: './sake-data.component.html',
  styleUrls: ['./sake-data.component.css']
})
export class SakeDataComponent implements OnInit {
  sakeid:string;
  sake:Sake;
  constructor(private route:ActivatedRoute, private location:Location, 
              private rsv:SakeService,private storage: AngularFireStorage,) { }

  profileUrl: Observable<string | null>;



  ngOnInit() {
    this.sakeid = this.route.snapshot.paramMap.get('id');
    this.sake = this.rsv.getSake(this.sakeid);

    var filePath = 'sakebook_pics/' + 'pict' + this.sakeid.toString() + '.jpeg'
    const ref = this.storage.ref(filePath);
    this.profileUrl = ref.getDownloadURL();
  }

  backToList() {
    this.location.back();
  }

}
