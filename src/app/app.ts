import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  empName: string = '';
  empDesignation: string = '';
  empAge: number | null = null;
  empSalary: number | null = null;
  
  editingIndex: number | null = null;
  employees: any[] = [];

  saveEmployee() {
    if (this.empName && this.empDesignation && this.empSalary) {
      const empData = {
        name: this.empName,
        designation: this.empDesignation,
        age: this.empAge,
        salary: this.empSalary,
        level: this.calculateLevel(this.empSalary),
        bonus: this.empSalary * 0.10 
      };

      if (this.editingIndex !== null) {
        this.employees[this.editingIndex] = empData;
        this.editingIndex = null;
      } else {
        this.employees.push(empData);
      }
      this.clearFields();
    }
  }

  editEmployee(index: number) {
    const emp = this.employees[index];
    this.empName = emp.name;
    this.empDesignation = emp.designation;
    this.empAge = emp.age;
    this.empSalary = emp.salary;
    this.editingIndex = index;
  }

  deleteEmployee(index: number) {
    this.employees.splice(index, 1);
    if (this.editingIndex === index) this.clearFields();
  }

  // New feature: Remove All
  removeAllEmployees() {
    if (confirm("Are you sure you want to remove all records?")) {
      this.employees = [];
      this.clearFields();
    }
  }

  calculateLevel(salary: number): string {
    if (salary > 50000) return 'High';
    if (salary >= 20000) return 'Medium';
    return 'Low';
  }

  clearFields() {
    this.empName = '';
    this.empDesignation = '';
    this.empAge = null;
    this.empSalary = null;
    this.editingIndex = null;
  }
}
