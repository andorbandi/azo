import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { EmployeeService } from '../shared/employee-service';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-employee',
  styleUrl: './employee.component.css',
  templateUrl: './employee.component.html',
})
export class EmployeeComponent {
  
  builder = inject(FormBuilder);
  employeeApi = inject(EmployeeService);

  employees!: any[];

  employeeForm = this.builder.group({
    name: [''],
    city: [''],
    salary: [''],
    positionId: ['']
  });

  visibleModal = false;

  ngOnInit() {
    this.getEmployees();
  }

  getEmployees() {
    this.employeeApi.getEmployees().subscribe({
      next: (res: any) => {
        console.log(res)
        this.employees = res.data;
      },
      error: (error: any) => {
        console.error(error);
      }
    });
  }

  toggleModal() {
    this.visibleModal = ! this.visibleModal;
  }

  saveEmployee() {
    console.log('Employee saved!');
    this.toggleModal();
  }

  

  createEmployee() {
    console.log('Employee created!');
    this.employeeApi.createEmployee(this.employeeForm.value).subscribe({
      next: (data: any) => {
        console.log(data);
      },
      error: (error: any) => {
        console.error(error);
      }
    });
  }

}
