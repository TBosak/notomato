import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { PersistenceService } from '../services/persistence.service';
import { Task } from '../models/task';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  @Input() data: Task[] = [];
  displayedColumns: string[] = ['tag', 'category', 'description', 'duration', 'date', 'settings'];
  constructor(public persistence: PersistenceService) { }

  ngOnInit() {
  }

  editTask(task: Task): void {
    this.persistence.addUnfinishedTask(task);
    this.persistence.removeFinishedTask(task);
  }

  deleteTask(task: Task): void {
    this.persistence.removeFinishedTask(task);
  }

}
