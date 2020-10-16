import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from 'angularfire2/storage';
import {Location} from '@angular/common';
import {FormGroup, FormBuilder} from '@angular/forms'
import {Sake} from '../sake/sake';
import {SakeService} from '../sake.service'

@Component({
  selector: 'app-update-sake-data',
  templateUrl: './update-sake-data.component.html',
  styleUrls: ['./update-sake-data.component.css']
})
export class UpdateSakeDataComponent implements OnInit {

  ngOnInit() {
  }
  sakeForm:FormGroup;
  constructor(private location:Location, 
              private storage: AngularFireStorage, private fb:FormBuilder, private rsv: SakeService) {
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

  selectedfile: any;
  selectFile(event) {
    this.selectFile = event.target.files[0]
  }

  backToList() {
    this.location.back();
  }

  register() {
    var sakeData = this.convertToSake();
    this.rsv.registerSakeDatabase(sakeData);
    
    var filePath = 'sakebook_pics/' + 'pict' + sakeData.id.toString() + '.jpeg'
    const fileRef = this.storage.ref(filePath);
    fileRef.put(this.selectFile).then(function() {
      alert('アップロードしました');
    });

  }

  toDate(str):Date {
    var arr = str.split('-')
    return new Date(arr[0], arr[1] - 1, arr[2]);
  };

  convertToSake():Sake {

    var sakeData : Sake = {
                       id:this.sakeForm.value.id,
                       name:this.sakeForm.value.name,
                       type:this.sakeForm.value.type,
                       rank:this.sakeForm.value.rank,
                       drink_start_date:this.toDate(this.sakeForm.value.drink_start_date),
                       drink_end_date:this.toDate(this.sakeForm.value.drink_end_date),
                       prefecture:this.sakeForm.value.prefecture,
                       amount:this.sakeForm.value.amount,
                       alcohol:this.sakeForm.value.alcohol,
                       bikou:this.sakeForm.value.bikou,
    };
    return sakeData;
  }

}
