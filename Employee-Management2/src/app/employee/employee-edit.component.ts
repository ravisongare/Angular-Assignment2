import { Component, OnInit } from '@angular/core';
import { Employee } from './employee';
import { FormGroup, FormBuilder, FormArray, Validators, FormControl } from '@angular/forms';
import { EmployeeService } from './employee.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.css']
})
export class EmployeeEditComponent implements OnInit {
  pageTitle = 'Employee Edit';
  employee: Employee;
  employeeForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private service: EmployeeService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  get languages(): FormArray {
    return this.employeeForm.get('languages') as FormArray;
  }

  ngOnInit() {
    this.employeeForm = this.fb.group({
      name: ['ravi', Validators.required],
      qualification: ['BE', Validators.required],
      experiance: ['1yr', Validators.required],
      languages: this.fb.array([]) // new FormArray( [this.buildLanguage()])
    });

    this.route.paramMap.subscribe(params => {
      const id = +params.get('id');
      this.getEmployee(id);
    });
  }

  addLanguages(): void {
    this.languages.push(this.buildLanguage());
  }

  buildLanguage(): FormControl {
    return this.fb.control({  });
  }
  getEmployee(id: number): void {
    this.service
      .getProduct(id)
      .subscribe(
        (employee: Employee) => this.displayEmployee(employee),
        (error: any) => console.log(error)
      );
  }

  displayEmployee(employee: Employee): void {
    if (this.employeeForm) {
      this.employeeForm.reset();
    }
    this.employee = employee;

    if (this.employee.id === 0) {
      this.pageTitle = 'Add Employee';
    } else {
      this.pageTitle = `Edit Employee: ${this.employee.name}`;
    }

    // Update the data on the form
    this.employeeForm.patchValue({
      name: this.employee.name,
      qualification: this.employee.qualification,
      experiance: this.employee.experiance
    });
    this.employeeForm.setControl(
      'languages',
      this.fb.array(this.employee.languages || [])
    );
  }

  saveEmployee(): void {
    console.log('before save' + JSON.stringify(this.employee));
    console.log('value in form' + JSON.stringify(this.employeeForm.value));
    const p = { ...this.employee, ...this.employeeForm.value };
    if (p.id === 0) {
      console.log('after save' + p);
      this.service.createEmployee(p).subscribe(() => this.onSaveComplete());
    } else {
      this.service.updateEmployee(p).subscribe(() => this.onSaveComplete());
    }
  }

  onSaveComplete(): void {
    // Reset the form to clear the flags
    this.employeeForm.reset();
    this.router.navigate(['/employee']);
  }

  deleteEmployee(): void {
    if (this.employee.id === 0) {
      // Don't delete, it was never saved.
      this.onSaveComplete();
    } else {
      if (confirm(`Really delete the product: ${this.employee.name}?`)) {
        this.service.deleteEmployee(this.employee.id)
          .subscribe(
            () => this.onSaveComplete()
          );
      }
    }
  }

 }
