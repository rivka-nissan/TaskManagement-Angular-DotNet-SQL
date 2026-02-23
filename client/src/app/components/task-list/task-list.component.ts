import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  filteredTasks: Task[] = [];
  searchText: string = '';

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.apiService.getAllTasks().subscribe(tasks => {
      this.tasks = tasks;
      this.filteredTasks = tasks;
    });
  }

  onSearch(): void {
    this.filteredTasks = this.tasks.filter(task =>
      task.Title.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  viewTask(id: number): void {
    this.router.navigate(['/tasks', id]);
  }

  editTask(id: number): void {
    this.router.navigate(['/tasks/edit', id]);
  }

  addTask(): void {
    this.router.navigate(['/tasks/new']);
  }

  deleteTask(id: number): void {
    if (confirm('האם למחוק משימה זו?')) {
      this.apiService.deleteTask(id).subscribe(() => {
        this.loadTasks();
      });
    }
  }
}
