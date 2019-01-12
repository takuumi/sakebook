import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [SakeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
