import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Settings } from '../models/settings';

@Injectable({
  providedIn: 'root'
})
export class PersistenceService {
  public timerActive: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public timerPaused: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public breakTimer: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public currentTag: BehaviorSubject<string> = new BehaviorSubject(null);
  public settings: Settings = new Settings();

  constructor() { }
}
