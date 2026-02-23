export interface Task {
  Id: number;
  Title: string;
  Description: string;
  StatusName: string;
  CategoryName: string;
  CreatedAt: string;
  DueDate?: string;
}

export interface TaskForm {
  Title: string;
  Description: string;
  StatusId: number;
  CategoryId: number;
  DueDate?: string;
}

export interface Status {
  Id: number;
  Name: string;
}

export interface Category {
  Id: number;
  Name: string;
}
