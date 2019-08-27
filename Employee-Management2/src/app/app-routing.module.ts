import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeListComponent } from './employee/employee-list.component';


const routes: Routes = [];

@NgModule({
  imports: [
    RouterModule.forRoot([
      {path: 'employee', component: EmployeeListComponent}
    ])
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
