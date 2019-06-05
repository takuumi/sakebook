import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {AccordionModule} from 'ngx-bootstrap';

import { OrderByPipe } from './utilities/order-by-pipe';

import { environment } from '../environments/environment'; // 追加
import { AngularFireModule } from '@angular/fire'; // 追加
import { AngularFirestoreModule } from '@angular/fire/firestore'; // 追加
import { AngularFireAuthModule } from '@angular/fire/auth'; // 追加
import {AngularFireStorageModule, StorageBucket} from '@angular/fire/storage';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SakeListComponent } from './sake-list/sake-list.component';
import { SakeDataComponent } from './sake-data/sake-data.component';
import { SakeService} from './sake.service';
import { UpdateSakeDataComponent } from './update-sake-data/update-sake-data.component'

@NgModule({
  declarations: [
    AppComponent,
    SakeListComponent,
    SakeDataComponent,
    OrderByPipe,
    UpdateSakeDataComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    AccordionModule.forRoot()
  ],
  providers: [
    SakeService,
    { provide: StorageBucket, useValue: 'disco-glow-209813.appspot.com' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
