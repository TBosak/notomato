import { Injectable } from '@angular/core';
import Dexie from 'dexie';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService extends Dexie {

  constructor() {
    super('Pomodirect');
    this.version(1).stores({
      finishedTasks: '++id, category, tag, description, status, createdAt, updatedAt, duration',
      unfinishedTasks: '++id, category, tag, description, status, createdAt, updatedAt, duration',
      settings: '++id, shortPomo, longPomo, shortBreak, longBreak, soundEnabled, soundFile'
  });

  this.open()
  .then(data => console.log('DB Opened'))
  .catch(err => console.log(err.message));
  }
}
