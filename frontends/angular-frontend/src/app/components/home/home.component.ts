import { Component, OnInit } from '@angular/core';
import { UserDTO } from 'src/app/models/user/user.model';
import { UserService } from 'src/app/services/user/user.service';
import { take } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskDTO } from 'src/app/models/task/task.model';
import { TaskService } from 'src/app/services/task/task.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public taskForm: FormGroup;
  public tasks: Array<TaskDTO>;
  public isEditing: boolean = false;

  constructor(
    private readonly userService: UserService,
    private readonly taskService: TaskService,
    private readonly formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.taskForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      id: ['', []],
    });

    if (!localStorage.getItem('USER_ID')) {
      this.userService
        .createUser()
        .pipe(take(1))
        .subscribe((user: UserDTO) => {
          localStorage.setItem('USER_ID', user.id.toString());
        });
    }

    this.taskService
      .getTasks(+localStorage.getItem('USER_ID'))
      .pipe(take(1))
      .subscribe((tasks: Array<TaskDTO>) => {
        this.tasks = tasks;
      });
  }

  public createTask(): void {
    if (this.taskForm.valid) {
      const task: TaskDTO = {
        title: this.taskForm.get('title').value,
        description: this.taskForm.get('description').value,
      };

      this.taskService
        .createTask(task, +localStorage.getItem('USER_ID'))
        .pipe(take(1))
        .subscribe((newTask: TaskDTO) => {
          this.tasks.push(newTask);
        });
    }
  }

  public removeTask(taskId: number, index: number): void {
    this.taskService
      .removeTask(taskId)
      .pipe(take(1))
      .subscribe(() => {
        this.tasks.splice(index, 1);
      });
  }

  public editTask(): void {
    if (this.taskForm.valid) {
      const index = this.tasks.indexOf(
        this.tasks.find((task) => task.id === +this.taskForm.get('id').value)
      );

      const task: TaskDTO = {
        title: this.taskForm.get('title').value,
        description: this.taskForm.get('description').value,
        id: +this.taskForm.get('id').value,
      };

      this.taskService
        .editTask(task)
        .pipe(take(1))
        .subscribe((updated: TaskDTO) => {
          this.tasks[index] = updated;
        });
    }
  }

  public toggleEdit(task: TaskDTO): void {
    this.isEditing = !this.isEditing;

    if (this.isEditing) {
      this.taskForm.patchValue({
        title: task.title,
        description: task.description,
        id: task.id,
      });
    } else this.taskForm.reset();
  }

  public get errorControl() {
    return this.taskForm.controls;
  }
}
