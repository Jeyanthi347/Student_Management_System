
import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';

import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { finalize } from 'rxjs';

import {
  StudentService,
  StudentResponseDto
} from '../services/student.service';

@Component({
  selector: 'app-students',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './students.html',
  styleUrl: './students.css'
})
export class Students implements OnInit {

  // Student registration details
  student = {
    studentName: '',
    gender: '',
    email: '',
    phoneNumber: '',
    departmentId: 1
  };

  // Success or error message
  message = '';

  // Store all student records
  students: StudentResponseDto[] = [];

  // Loading status
  isSubmitting = false;

  // Inject StudentService and ChangeDetectorRef
  constructor(
    private studentService: StudentService,
    private cdr: ChangeDetectorRef
  ) {}

  // Execute when component loads
  ngOnInit(): void {
    this.getStudents();
  }

  // Add a new student
  onSubmit(): void {

    // Prevent multiple submissions
    if (this.isSubmitting) {
      return;
    }

    // Validate Department ID
    if (Number(this.student.departmentId) <= 0) {
      this.message = 'Please enter a valid Department ID.';
      this.cdr.detectChanges();
      return;
    }

    console.log('Add Student button clicked');

    console.log('Student Data:', this.student);

    // Start loading
    this.isSubmitting = true;
    this.message = 'Adding Student...';

    this.cdr.detectChanges();

    // Prepare student data
    const studentData = {
      ...this.student,
      departmentId: Number(this.student.departmentId)
    };

    // Call POST API
    this.studentService.createStudent(studentData)
      .pipe(

        finalize(() => {

          // Stop loading
          this.isSubmitting = false;

          console.log(
            'Finalize executed. isSubmitting:',
            this.isSubmitting
          );

          // Refresh screen
          this.cdr.detectChanges();

        })

      )
      .subscribe({

        // When API request succeeds
        next: (response) => {

          console.log('API Response:', response);

          // Display success message
          this.message =
            'Student added successfully! Student ID: ' +
            response.studentId;

          console.log('Success message:', this.message);

          // Clear registration form
          this.student = {
            studentName: '',
            gender: '',
            email: '',
            phoneNumber: '',
            departmentId: 1
          };

          // Update screen
          this.cdr.detectChanges();

          // Refresh student list
          this.getStudents();

        },

        // When API request fails
        error: (error) => {

          console.error('API Error:', error);

          this.message =
            error.error?.title ||
            error.error?.message ||
            'Unable to add student. Please check the entered details.';

          // Update screen
          this.cdr.detectChanges();

        },

        // When request completes
        complete: () => {

          console.log('POST request completed.');

        }

      });
  }

  // Get all students
  getStudents(): void {

    console.log('Fetching students from database...');

    this.studentService.getAllStudents().subscribe({

      // When GET API succeeds
      next: (response) => {

        console.log('Students received:', response);

        this.students = response;

        // Update screen
        this.cdr.detectChanges();

      },

      // When GET API fails
      error: (error) => {

        console.error('Error fetching students:', error);

      }

    });
  }
}
