import { Component, OnInit } from '@angular/core';
import { Employee } from './employee';
import { EmployeeService } from './employee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  pageTitle = 'Employee List';
  employees: Employee[];
  constructor(private service: EmployeeService,
              private route: Router) { }

  ngOnInit() {
this.getData();
  }


    deleteEmployee(employee: Employee): void {
    if (employee.id === 0) {
      // Don't delete, it was never saved.
      this.getData();
    } else {
      if (confirm(`Really delete the product: ${employee.name}?`)) {
        this.service.deleteEmployee(employee.id)
          .subscribe(
            () => this.getData()
          );
      }
    }
  }

  getData(): void {
    this.service.getEmployees().subscribe(
      emp => {
        this.employees = emp;
      }
    );
  }

}
