import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from 'angularfire2/storage';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import {Location} from '@angular/common';
import {FormControl, FormGroup, FormBuilder} from '@angular/forms'
import {Sake} from '../sake/sake';
import { SakeDataComponent } from '../sake-data/sake-data.component';
import { fromNumber } from 'long';

@Component({
  selector: 'app-update-sake-data',
  templateUrl: './update-sake-data.component.html',
  styleUrls: ['./update-sake-data.component.css']
})
export class UpdateSakeDataComponent implements OnInit {

  ngOnInit() {
  }
  sakeForm:FormGroup;
  constructor(private route:ActivatedRoute, private location:Location, 
              private storage: AngularFireStorage, private fb:FormBuilder) {
                this.sakeForm = this.fb.group({
                  id:1,
                  name: "",
                  type: "",
                  rank:3,
                  drink_start_date:new Date(2019,1,1),
                  drink_end_date:new Date(2019,1,1),  
                  prefecture:"",
                  amount:720,
                  alcohol:16,
                  bikou:""
                })

              }

  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;
  selectedfile: string;
  // @@@ detailに移動
  //profileUrl: Observable<string | null>;
  selectFile(event) {
    this.selectedfile = event.target.files[0];

   // @@@ detailに移動
   // const ref = this.storage.ref('sakebook_pics/main.png');
   // this.profileUrl = ref.getDownloadURL();
  }

  backToList() {
    this.location.back();
  }

  register(event: Event) {
    //@@@入力チェック
    debugger;
    var sakeData = this.convertToSake();

    //@@@ファイルパスIDから
    const filePath = 'sakebook_pics/pict.jpeg';
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, this.selectFile);

    // observe percentage changes
    this.uploadPercent = task.percentageChanges();
    // get notified when the download URL is available
    task.snapshotChanges().pipe(
        finalize(() => this.downloadURL = fileRef.getDownloadURL() )
     )
    .subscribe()
  }

  convertToSake():Sake {

    var sakeData : Sake = {
                       id:this.sakeForm.value.id,
                       name:this.sakeForm.value.name,
                       type:this.sakeForm.value.type,
                       rank:this.sakeForm.value.rank,
                       drink_start_date:this.sakeForm.value.drink_start_date,
                       drink_end_date:this.sakeForm.value.drink_start_date,
                       prefecture:this.sakeForm.value.prefecture,
                       amount:this.sakeForm.value.amount,
                       alcohol:this.sakeForm.value.alcohol,
                       bikou:this.sakeForm.value.bikou,
    };
    return sakeData;
  }

}
