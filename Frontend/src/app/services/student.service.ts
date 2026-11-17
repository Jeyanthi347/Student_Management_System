
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Student data sent to the backend
export interface StudentCreateDto {
  studentName: string;
  gender: string;
  email: string;
  phoneNumber: string;
  departmentId: number;
}

// Student response received from the backend
export interface StudentResponseDto {
  studentId: number;
  studentName: string;
  gender: string;
  email: string;
  phoneNumber: string;
  departmentId: number;
}

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private apiUrl = 'https://localhost:7028/api/Student';

  constructor(private http: HttpClient) {}

  // POST: Create Student
  createStudent(student: StudentCreateDto): Observable<StudentResponseDto> {
    return this.http.post<StudentResponseDto>(this.apiUrl, student);
  }

  // GET: Retrieve all Students
  getAllStudents(): Observable<StudentResponseDto[]> {
    return this.http.get<StudentResponseDto[]>(this.apiUrl);
  }

  // GET: Retrieve Student by ID
  getStudentById(studentId: number): Observable<StudentResponseDto> {
    return this.http.get<StudentResponseDto>(
      `${this.apiUrl}/${studentId}`
    );
  }

  // PUT: Update Student
  updateStudent(
    studentId: number,
    student: StudentCreateDto
  ): Observable<StudentResponseDto> {
    return this.http.put<StudentResponseDto>(
      `${this.apiUrl}/${studentId}`,
      student
    );
  }

  // DELETE: Delete Student
  deleteStudent(studentId: number): Observable<string> {
    return this.http.delete(
      `${this.apiUrl}/${studentId}`,
      { responseType: 'text' }
    );
  }
}
