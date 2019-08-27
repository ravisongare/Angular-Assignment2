import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeListComponent } from './employee-list.component';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { EmployeeData } from './employee-data';
import { EmployeeEditComponent } from './employee-edit.component';
import { RouterModule } from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import { from } from 'rxjs';



@NgModule({
  declarations: [EmployeeListComponent, EmployeeEditComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
 //  InMemoryWebApiModule.forRoot(EmployeeData),
    RouterModule.forRoot([
      {path: '', component: EmployeeListComponent},
      {path: 'employees/:id/edit', component: EmployeeEditComponent}
    ])

  ]
})
export class EmployeeModule { }
