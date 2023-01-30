import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Task } from '../models/task';
import { PersistenceService } from 'src/app/services/persistence.service';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {
  @Input() task: Task = new Task();
  taskForm: FormGroup;

  constructor(public fb: FormBuilder, public persistence: PersistenceService) {
    this.taskForm = this.fb.group(this.task);
  }

  ngOnInit(): void {
    if(this.task.description) {
      this.taskForm.patchValue(this.task);
    };
  }

  onSubmit(): void {
    this.task.tag = this.taskForm.value.tag;
    this.task.description = this.taskForm.value.description;
    this.task.category = this.taskForm.value.category;
    this.persistence.addFinishedTask(this.task);
    this.persistence.removeUnfinishedTask(this.task);
  }

  removeTask(): void {
    this.persistence.removeUnfinishedTask(this.task);
  }

}
