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

  constructor(
    private readonly userService: UserService,
    private readonly taskService: TaskService,
    private readonly formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.taskForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
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

  public get errorControl() {
    return this.taskForm.controls;
  }
}
