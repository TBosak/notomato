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
      this.tagOpts = [...new Set(data.map(a => a.tag))];
      this.catOpts = [...new Set(data.map(a => a.category))];
    });
  }

  submitFilters() {
    this.filters = this.filterForm.value;
    let filteredData = this.data;

    if (this.filters.startDate !== null && this.filters.endDate !== null) {
      filteredData = filteredData.filter(a =>
        (a.createdAt >= this.filters.startDate && a.createdAt <= this.filters.endDate) ||
        (a.createdAt.getDate() === this.filters.startDate.getDate()) ||
        (a.createdAt.getDate() === this.filters.endDate.getDate()));
    }

    if (this.filters.categories?.length > 0 && this.filters.categories !== null) {
      filteredData = filteredData.filter(a => this.filters.categories.includes(a.category));
    }

    if (this.filters.tags?.length > 0 && this.filters.tags !== null) {
      filteredData = filteredData.filter(a => this.filters.tags.includes(a.tag));
    }

    this.filteredData = filteredData;
  }

  clearFilters() {
    this.filterForm.reset();
    this.filters = new Filters();
    this.filteredData = null;
  }
}
