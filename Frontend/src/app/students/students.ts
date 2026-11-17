
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

  student = {
    studentName: '',
    gender: '',
    email: '',
    phoneNumber: '',
    departmentId: 1
  };

  message = '';
  students: StudentResponseDto[] = [];
  isSubmitting = false;

  // Search Student properties
  searchStudentId: number | null = null;
  searchedStudent: StudentResponseDto | null = null;
  searchMessage = '';
  isSearching = false;

  // Update Student properties
  isEditMode = false;
  editingStudentId: number | null = null;

  constructor(
    private studentService: StudentService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getStudents();
  }

  // POST: Create Student
  onSubmit(): void {

    if (this.isSubmitting) {
      return;
    }

    if (Number(this.student.departmentId) <= 0) {
      this.message = 'Please enter a valid Department ID.';
      this.cdr.detectChanges();
      return;
    }

    this.isSubmitting = true;
    this.message = this.isEditMode
      ? 'Updating Student...'
      : 'Adding Student...';

    this.cdr.detectChanges();

    const studentData = {
      ...this.student,
      departmentId: Number(this.student.departmentId)
    };

    if (this.isEditMode && this.editingStudentId !== null) {

      // PUT: Update Student
      this.studentService.updateStudent(
        this.editingStudentId,
        studentData
      )
        .pipe(
          finalize(() => {
            this.isSubmitting = false;
            this.cdr.detectChanges();
          })
        )
        .subscribe({
          next: (response) => {

            this.message =
              'Student updated successfully! Student ID: ' +
              response.studentId;

            this.resetForm();
            this.getStudents();
            this.cdr.detectChanges();
          },
          error: (error) => {
            console.error('Update API Error:', error);

            this.message =
              error.error?.title ||
              error.error?.message ||
              'Unable to update student.';

            this.cdr.detectChanges();
          }
        });

    } else {

      // POST: Create Student
      this.studentService.createStudent(studentData)
        .pipe(
          finalize(() => {
            this.isSubmitting = false;
            this.cdr.detectChanges();
          })
        )
        .subscribe({
          next: (response) => {

            this.message =
              'Student added successfully! Student ID: ' +
              response.studentId;

            this.resetForm();
            this.getStudents();
            this.cdr.detectChanges();
          },
          error: (error) => {
            console.error('API Error:', error);

            this.message =
              error.error?.title ||
              error.error?.message ||
              'Unable to add student. Please check the entered details.';

            this.cdr.detectChanges();
          }
        });
    }
  }

  // Reset Student Form
  resetForm(): void {
    this.student = {
      studentName: '',
      gender: '',
      email: '',
      phoneNumber: '',
      departmentId: 1
    };

    this.isEditMode = false;
    this.editingStudentId = null;
  }

  // GET: Retrieve all students
  getStudents(): void {
    this.studentService.getAllStudents().subscribe({
      next: (response) => {
        this.students = response;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error fetching students:', error);
      }
    });
  }

  // GET: Retrieve Student by ID
  searchStudent(): void {

    if (!this.searchStudentId || this.searchStudentId <= 0) {
      this.searchMessage = 'Please enter a valid Student ID.';
      this.searchedStudent = null;
      return;
    }

    this.isSearching = true;
    this.searchMessage = 'Searching student...';
    this.searchedStudent = null;
    this.cdr.detectChanges();

    this.studentService.getStudentById(this.searchStudentId)
      .pipe(
        finalize(() => {
          this.isSearching = false;
          this.cdr.detectChanges();
        })
      )
      .subscribe({
        next: (response) => {
          this.searchedStudent = response;
          this.searchMessage = 'Student found successfully!';
          this.cdr.detectChanges();
        },
        error: (error) => {
          console.error('Search API Error:', error);

          this.searchedStudent = null;

          if (error.status === 404) {
            this.searchMessage = 'Student not found!';
          } else {
            this.searchMessage =
              'Unable to search student. Please try again.';
          }

          this.cdr.detectChanges();
        }
      });
  }

  // Clear Search
  clearSearch(): void {
    this.searchStudentId = null;
    this.searchedStudent = null;
    this.searchMessage = '';
  }

  // Edit Student
  editStudent(student: StudentResponseDto): void {

    this.isEditMode = true;
    this.editingStudentId = student.studentId;

    this.student = {
      studentName: student.studentName,
      gender: student.gender,
      email: student.email,
      phoneNumber: student.phoneNumber,
      departmentId: student.departmentId
    };

    this.message = 'Editing Student ID: ' + student.studentId;

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  // Cancel Update
  cancelEdit(): void {
    this.resetForm();
    this.message = 'Update cancelled.';
  }
}
