import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:5000/api/exec';

  constructor(private http: HttpClient) {}

  exec(procedureName: string, parameters: any = {}): Observable<any[]> {
    // התיקון כאן: השמות spName ו-parameters באותיות קטנות כדי שיתאימו לשרת
    const body = { 
      spName: procedureName, 
      parameters: parameters 
    };
    
    return this.http.post<any>(this.apiUrl, body).pipe(
      map(response => Array.isArray(response) ? response : [])
    );
  }

  getAllTasks(): Observable<any[]> { return this.exec('Tasks_GetAll'); }
  getTaskById(id: number): Observable<any> {
    return this.exec('Tasks_GetById', { id }).pipe(
      map(tasks => tasks && tasks.length > 0 ? tasks[0] : null)
    );
  }
  createTask(task: any): Observable<any> { return this.exec('Tasks_Create', task); }
  updateTask(id: number, task: any): Observable<any> { return this.exec('Tasks_Update', { id, ...task }); }
  deleteTask(id: number): Observable<any> { return this.exec('Tasks_Delete', { id }); }
  getStatuses(): Observable<any[]> { return this.exec('Statuses_GetAll'); }
  getCategories(): Observable<any[]> { return this.exec('Categories_GetAll'); }
}
