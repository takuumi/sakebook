import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SakeListComponent} from './sake-list/sake-list.component'
import { SakeDataComponent} from './sake-data/sake-data.component'



const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot([
      {path:"", redirectTo: '/sake-list', pathMatch:'full'},
      {path:"sake-list", component:SakeListComponent},
      {path:"sake-data/:id", component:SakeDataComponent}  
    ])
  
  
  
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
