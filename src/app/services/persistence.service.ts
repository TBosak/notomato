import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Settings } from '../models/settings';

@Injectable({
  providedIn: 'root'
})
export class PersistenceService {
  public timerActive: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public breakTimer: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public settings: Settings = new Settings();

  constructor() { }
}
