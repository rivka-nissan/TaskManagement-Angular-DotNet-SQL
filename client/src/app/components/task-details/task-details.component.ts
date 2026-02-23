import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css']
})
export class TaskDetailsComponent implements OnInit {
  task: any = null;

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.loadTask(id);
  }

  loadTask(id: number): void {
    this.apiService.getTaskById(id).subscribe(task => {
      this.task = task;
    });
  }

  goBack(): void {
    this.router.navigate(['/tasks']);
  }

  editTask(): void {
    this.router.navigate(['/tasks/edit', this.task.Id]);
  }
}
