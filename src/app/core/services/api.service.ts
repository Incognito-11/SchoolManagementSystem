import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Student } from 'src/app/models/student.model';
import { Teacher } from 'src/app/models/teacher.model';
import { Finance } from 'src/app/models/finance.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private base = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // users (for admin listing, optional)
  getUsers() {
    return this.http.get(`${this.base}/users`);
  }

  // students
  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.base}/students?_sort=firstName`);
  }
  getStudent(id: number) {
    return this.http.get<Student>(`${this.base}/students/${id}`);
  }
  addStudent(payload: Student) {
    return this.http.post<Student>(`${this.base}/students`, payload);
  }
  updateStudent(id: number, payload: Partial<Student>) {
    return this.http.patch<Student>(`${this.base}/students/${id}`, payload);
  }
  deleteStudent(id: number) {
    return this.http.delete(`${this.base}/students/${id}`);
  }

  // teachers
  getTeachers(): Observable<Teacher[]> {
    return this.http.get<Teacher[]>(`${this.base}/teachers`);
  }
  // finances
  getTransactions(): Observable<Finance[]> {
    return this.http.get<Finance[]>(
      `${this.base}/transactions?_sort=date&_order=desc`
    );
  }
  addTransaction(tx: Finance) {
    return this.http.post<Finance>(`${this.base}/transactions`, tx);
  }
}
