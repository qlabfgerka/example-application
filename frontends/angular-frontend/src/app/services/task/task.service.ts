import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TaskDTO } from 'src/app/models/task/task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private readonly hostname: string = 'http://localhost:3000';

  constructor(private readonly httpClient: HttpClient) {}

  public createTask(task: TaskDTO, userId: number): Observable<TaskDTO> {
    return this.httpClient.post<TaskDTO>(`${this.hostname}/task`, {
      task,
      userId,
    });
  }

  public getTasks(userId: number): Observable<Array<TaskDTO>> {
    return this.httpClient.get<Array<TaskDTO>>(
      `${this.hostname}/task/${userId}`
    );
  }

  public removeTask(taskId: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.hostname}/task/${taskId}`);
  }

  public editTask(task: TaskDTO): Observable<TaskDTO> {
    return this.httpClient.put<TaskDTO>(`${this.hostname}/task`, { task });
  }
}
