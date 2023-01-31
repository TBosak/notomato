import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { PersistenceService } from '../services/persistence.service';
import { Task } from '../models/task';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  @Input() data: Task[] = [];
  displayedColumns: string[] = ['tag', 'category', 'description', 'duration', 'date', 'settings'];
  constructor(public persistence: PersistenceService, public db: DatabaseService) { }

  ngOnInit() {
  }

  editTask(task: Task): void {
    this.db.table('unfinishedTasks').add(task);
    this.db.table('finishedTasks').delete(task.id);
    // this.persistence.addUnfinishedTask(task);
    // this.persistence.removeFinishedTask(task);
  }

  deleteTask(task: Task): void {
    this.db.table('finishedTasks').delete(task.id);
  }

}
