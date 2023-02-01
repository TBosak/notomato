import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Task } from '../models/task';
import { PersistenceService } from 'src/app/services/persistence.service';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnInit {
  @Input() task: Task = new Task();
  taskForm: FormGroup;

  constructor(public fb: FormBuilder, public persistence: PersistenceService, public db: DatabaseService) {
    this.taskForm = this.fb.group(this.task);
  }

  ngOnInit(): void {
    if(this.task.description) {
      this.taskForm.patchValue(this.task);
    };
  }

  submitTask(): void {
    this.task.tag = this.taskForm.value.tag;
    this.task.description = this.taskForm.value.description;
    this.task.category = this.taskForm.value.category;
    this.db.table('finishedTasks').add(this.task);
    this.db.table('unfinishedTasks').delete(this.task.id);
  }

  removeTask(): void {
    this.db.table('unfinishedTasks').delete(this.task.id);
  }

}
