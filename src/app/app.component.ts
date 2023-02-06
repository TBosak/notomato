import { Component, OnInit } from '@angular/core';
import { PersistenceService } from './services/persistence.service';
import { DatabaseService } from './services/database.service';
import { liveQuery } from 'dexie';
import { Settings } from './models/settings';
import { AudioService } from './services/audio.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  settingsObservable$;

  constructor(public persistence: PersistenceService, public db: DatabaseService, public audio: AudioService) {}

  ngOnInit() {
    this.db.table('settings').add(
      new Settings(15,30,5,15,true,'assets/audio/bell.mp3'));
    this.settingsObservable$ = liveQuery(() => this.db.table('settings').toArray());
    this.settingsObservable$.subscribe(data => {
      if(Object.values(data[0]).every(value => value !== undefined && value !== null && value !== 0)){
        this.persistence.settings = data[0];
        this.audio.soundEnabled = data[0].soundEnabled;
        this.audio.soundFile = data[0].soundFile;
      }
    });
    this.db.table('settings').toArray().then(data => {
      if(Object.values(data[0]).every(value => value !== undefined && value !== null && value !== 0)){
        this.persistence.settings = data[0];
        this.audio.soundEnabled = data[0].soundEnabled;
        this.audio.soundFile = data[0].soundFile;
      }
    });
  }
}
