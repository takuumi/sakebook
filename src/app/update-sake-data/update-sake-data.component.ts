import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from 'angularfire2/storage';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import {Location} from '@angular/common';


@Component({
  selector: 'app-update-sake-data',
  templateUrl: './update-sake-data.component.html',
  styleUrls: ['./update-sake-data.component.css']
})
export class UpdateSakeDataComponent implements OnInit {

  ngOnInit() {
  }
  constructor(private route:ActivatedRoute, private location:Location, private storage: AngularFireStorage) {}

  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;
  profileUrl: Observable<string | null>;
  uploadFile(event) {
    const file = event.target.files[0];
    const filePath = 'sakebook_pics/main.png';
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

    // observe percentage changes
    this.uploadPercent = task.percentageChanges();
    // get notified when the download URL is available
    task.snapshotChanges().pipe(
        finalize(() => this.downloadURL = fileRef.getDownloadURL() )
     )
    .subscribe()


    const ref = this.storage.ref('sakebook_pics/main.png');
    this.profileUrl = ref.getDownloadURL();
  }

  backToList() {
    this.location.back();
  }

}
