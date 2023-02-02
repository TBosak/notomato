/* eslint-disable no-var */
import { Component, OnInit } from '@angular/core';
import { Observable, liveQuery } from 'dexie';
import { DatabaseService } from '../services/database.service';
import { Task } from '../models/task';
import { BehaviorSubject } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Filters } from '../models/filters';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {
filters: Filters = new Filters();
filtersSubject: BehaviorSubject<Filters> = new BehaviorSubject<Filters>(new Filters());
finished$: Observable<Task[]>;
filteredData: Task[];
data: Task[];
tagOpts: string[];
catOpts: string[];
filterForm: FormGroup;

  constructor(public db: DatabaseService, public fb: FormBuilder) {
    this.filterForm = this.fb.group(this.filters);
  }

  ngOnInit() {
    this.finished$ = liveQuery(() => this.db.table('finishedTasks').toArray());
    this.finished$.subscribe((data) => {
      this.data = data;
      this.tagOpts = data.map(a => a.tag);
      this.catOpts = data.map(a => a.category);
    });
  }

  submitFilters() {
    this.filtersSubject.next(this.filterForm.value);
    this.filters = this.filterForm.value;
    this.filteredData = this.data
    .filter(a => (a.createdAt >= this.filters.startDate && a.createdAt <= this.filters.endDate))
    .filter(a => (this.filters.categories.length === 0 || this.filters.categories?.includes(a.category)))
    .filter(a => (this.filters.tags.length === 0 || this.filters.tags?.includes(a.tag)));
  }

  clearFilters() {
    this.filterForm.reset();
    this.filtersSubject.next(new Filters());
  }
}
