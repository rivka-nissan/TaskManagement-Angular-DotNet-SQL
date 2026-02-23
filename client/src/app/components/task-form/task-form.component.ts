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

    this.taskId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.taskId) {
      this.isEditMode = true;
      this.loadTask(this.taskId);
    }
  }

  loadStatuses(): void {
    this.apiService.getStatuses().subscribe(statuses => {
      this.statuses = statuses;
    });
  }

  loadCategories(): void {
    this.apiService.getCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

  loadTask(id: number): void {
    this.apiService.exec('Tasks_GetByIdWithIds', { id }).subscribe(result => {
      const task = result[0];
      this.taskForm.patchValue({
        Title: task.Title,
        Description: task.Description,
        StatusId: task.StatusId,
        CategoryId: task.CategoryId,
        DueDate: task.DueDate ? task.DueDate.split('T')[0] : ''
      });
    });
  }

  onSubmit(): void {
    if (this.taskForm.valid) {
      const formValue = this.taskForm.value;
      
      if (this.isEditMode && this.taskId) {
        this.apiService.updateTask(this.taskId, formValue).subscribe(() => {
          this.router.navigate(['/tasks']);
        });
      } else {
        this.apiService.createTask(formValue).subscribe(() => {
          this.router.navigate(['/tasks']);
        });
      }
    }
  }

  cancel(): void {
    this.router.navigate(['/tasks']);
  }
}
