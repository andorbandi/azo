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

  employeeForm = this.builder.group({
    name: [''],
    city: [''],
    salary: [''],
    positionId: ['']
  });

  visibleModal = false;

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
