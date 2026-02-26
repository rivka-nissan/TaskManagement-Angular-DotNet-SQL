import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {
  taskForm: FormGroup;
  isEditMode = false;
  taskId?: number;
  statuses: any[] = [];
  categories: any[] = [];

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.taskForm = this.fb.group({
      Title: ['', Validators.required],
      Description: ['', Validators.required],
      StatusId: ['', Validators.required],
      CategoryId: ['', Validators.required],
      DueDate: ['']
    });
  }

  ngOnInit(): void {
    this.loadStatuses();
    this.loadCategories();

    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.taskId = Number(idParam);
      this.isEditMode = true;
      this.loadTask(this.taskId);
    }
  }

  loadStatuses(): void {
    this.apiService.getStatuses().subscribe({
      next: (data) => {
        console.log('--- סטטוסים שנטענו ---');
        console.table(data);
        this.statuses = data || [];
      },
      error: (err) => console.error('שגיאה בטעינת סטטוסים:', err)
    });
  }

  loadCategories(): void {
    this.apiService.getCategories().subscribe({
      next: (data) => {
        console.log('--- קטגוריות שנטענו ---');
        console.table(data);
        this.categories = data || [];
      },
      error: (err) => console.error('שגיאה בטעינת קטגוריות:', err)
    });
  }

  loadTask(id: number): void {
    this.apiService.exec('Tasks_GetById', { id }).subscribe({
      next: (result) => {
        if (result && result.length > 0) {
          const task = result[0];
          this.taskForm.patchValue({
            Title: task.Title,
            Description: task.Description,
            StatusId: task.StatusId,
            CategoryId: task.CategoryId,
            DueDate: task.DueDate ? task.DueDate.split('T')[0] : ''
          });
        }
      },
      error: (err) => console.error('שגיאה בטעינת משימה לעריכה:', err)
    });
  }

  onSubmit(): void {
    console.log('ניסיון שליחת טופס...');
    
    if (this.taskForm.valid) {
      const formValue = this.taskForm.value;
      
      // 
      const payload = {
        ...formValue,
        StatusId: Number(formValue.StatusId),
        CategoryId: Number(formValue.CategoryId)
      };

      console.log('הנתונים שנשלחים לשרת:', payload);

      if (this.isEditMode && this.taskId) {
        this.apiService.updateTask(this.taskId, payload).subscribe({
          next: () => {
            alert('המשימה עודכנה בהצלחה!');
            this.router.navigate(['/tasks']);
          },
          error: (err) => {
            console.error('שגיאה בעדכון משימה (500):', err);
            alert('שגיאת שרת בעדכון. בדקי את ה-Console של ה-API.');
          }
        });
      } else {
        this.apiService.createTask(payload).subscribe({
          next: () => {
            alert('משימה חדשה נוצרה!');
            this.router.navigate(['/tasks']);
          },
          error: (err) => {
            console.error('שגיאה ביצירת משימה (500):', err);
            alert('שגיאת שרת ביצירה. ייתכן שחסר פרמטר ב-SQL?');
          }
        });
      }
    } else {
      console.warn('הטופס לא תקין:', this.taskForm.controls);
      alert('נא למלא את כל שדות החובה!');
      
      // 
      Object.keys(this.taskForm.controls).forEach(key => {
        const control = this.taskForm.get(key);
        if (control?.invalid) {
          console.log(`השדה ${key} לא תקין`);
        }
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/tasks']);
  }
}
