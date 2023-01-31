import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersistenceService {
  public timerActive: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public breakTimer: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor() { }
}
