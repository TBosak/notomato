import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class PersistenceService {
  public unfinishedTasks: BehaviorSubject<Task[]> = new BehaviorSubject([]);
  public finishedTasks: BehaviorSubject<Task[]> = new BehaviorSubject([]);
  public timerActive: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public breakTimer: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor() { }

  addUnfinishedTask(task: Task){
    this.unfinishedTasks.next( [...this.unfinishedTasks.value, task] );
  }

  removeUnfinishedTask(task: Task){
    this.unfinishedTasks.next( this.unfinishedTasks.getValue().filter( t => t !== task) );
  }

  addFinishedTask(task: Task){
    this.finishedTasks.next( [...this.finishedTasks.value, task] );
  }

  removeFinishedTask(task: Task){
    this.finishedTasks.next( this.finishedTasks.getValue().filter( t => t !== task ) );
  }

  getUnfinishedTasks(){
    return this.unfinishedTasks.value;
  }

  getFinishedTasks(){
    return this.finishedTasks.value;
  }

}
