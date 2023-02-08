import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { PersistenceService } from '../services/persistence.service';
import { Task } from '../models/task';
import { DatabaseService } from '../services/database.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, AfterViewInit {
  @Input() settings = true;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource: MatTableDataSource<Task>;
  displayedColumns: string[] = ['tag', 'category', 'description', 'duration', 'date', 'settings'];


  constructor(public persistence: PersistenceService, public db: DatabaseService) {
    this.dataSource = new MatTableDataSource<Task>(this.data);
  }

  @Input() set data(value: Array<Task>){
    this.dataSource.data = value;
  };

  ngOnInit() {
    if(!this.settings) {
      this.displayedColumns = this.displayedColumns.filter(a => a !== 'settings');
    }

  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  editTask(task: Task): void {
    this.db.table('unfinishedTasks').add(task);
    this.db.table('finishedTasks').delete(task.id);
  }

  deleteTask(task: Task): void {
    this.db.table('finishedTasks').delete(task.id);
  }

}
