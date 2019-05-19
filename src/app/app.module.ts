import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {AccordionModule} from 'ngx-bootstrap';

// カスタムパイプ
import { OrderByPipe } from './utilities/order-by-pipe';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SakeListComponent } from './sake-list/sake-list.component';
import { SakeDataComponent } from './sake-data/sake-data.component';
import { SakeService} from './sake.service'

@NgModule({
  declarations: [
    AppComponent,
    SakeListComponent,
    SakeDataComponent,
    OrderByPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AccordionModule.forRoot()
  ],
  providers: [SakeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
