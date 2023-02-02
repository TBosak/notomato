import { Component, OnInit } from '@angular/core';
import { Settings } from '../models/settings';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DatabaseService } from '../services/database.service';
import { PersistenceService } from '../services/persistence.service';
import { Observable, liveQuery } from 'dexie';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  settings: Settings = new Settings();
  settingsObservable$: Observable<Settings[]>;
  settingsForm: FormGroup;

  constructor(public fb: FormBuilder, public persistence: PersistenceService, public db: DatabaseService) {
    this.settingsForm = this.fb.group(this.settings);
  }

  ngOnInit(): void {
    this.settingsObservable$ = liveQuery(() => this.db.table('finishedTasks').toArray());
    this.settingsObservable$.subscribe(data => {
      if(data.length > 0){
        this.settingsForm.patchValue(this.settings);
      }
    });
  }

}
