import { AfterViewInit, Component, OnInit } from '@angular/core';
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
    this.settingsObservable$ = liveQuery(() => this.db.table('settings').toArray());
    this.settingsObservable$.subscribe(data => {
      if(data.length > 0 && data[0] !== this.settingsForm.value){
        this.settingsForm.patchValue(data[0]);
      }
    });
  }

  saveSettings(): void {
      this.db.table('settings').clear();
      this.db.table('settings').add(this.settingsForm.value);
  }
}
