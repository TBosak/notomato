/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/semi */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable prefer-arrow/prefer-arrow-functions */
import { Component, OnInit, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { CountdownComponent, CountdownConfig, CountdownEvent } from 'ngx-countdown';
import { BehaviorSubject, of } from 'rxjs';
import { PersistenceService } from '../services/persistence.service';
import { Task } from '../models/task';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-chronograph',
  templateUrl: './chronograph.component.html',
  styleUrls: ['./chronograph.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChronographComponent implements OnInit {
  @ViewChild('cd', { static: false }) countdown: CountdownComponent;
  startTime: number;
  timesUp = new Audio('assets/audio/ding.wav');
  secondsLeft: BehaviorSubject<number> = new BehaviorSubject(0);
  notifications: number[] = [...Array(3600).keys()].splice(1,3600);
  pathRemaining = {};
  colorCodes = {
    base: {color: 'hsla(175,85%,24%,1)', time: null},
    warning: {color: 'hsla(35,90%,57%,1', time: 20},
    alert: {color: 'hsla(8,95%,58%,1)', time: 10}
    };
  remainingPathColor = '';
  countDownConfig: BehaviorSubject<CountdownConfig> = new BehaviorSubject<CountdownConfig>({
    leftTime: 0,
    format: 'mm:ss',
    notify: this.notifications
  });

  constructor(public persistence: PersistenceService, public db: DatabaseService) {
  }

  ngOnInit(): void {

    this.countDownConfig.subscribe(config => {
      this.startTime = config.leftTime;
    });

    // this.secondsLeft.subscribe({
    //   next:(value)=>{
    //     console.log(value + 'passed to subscription');
    //     this.setRemainingPathColor(value);
    //     this.pathRemaining = {'stroke-dasharray': `${this.calculateDashArray(value)}`};
    //     console.log(`${this.calculateDashArray(value)}`);
    //   }
    // });
  }

  startTimer() {
    this.countdown.begin();
    this.persistence.timerActive.next(true);
  }

  stopTimer() {
    this.countdown.stop();
    this.persistence.timerActive.next(false);
  }

  resetTimer() {
    this.countdown.restart();
    this.persistence.timerActive.next(true);
  }

  pauseTimer() {
    this.countdown.pause();
    this.persistence.timerActive.next(false);
  }

  resumeTimer() {
    this.countdown.resume();
    this.persistence.timerActive.next(false);
  }

  setTime(time) {
    this.countDownConfig.next({
      leftTime: time,
      format: 'mm:ss'
    })
  }

  handleEvent(e: CountdownEvent) {
    if (e.action === 'start') {
      this.remainingPathColor = this.colorCodes.base.color;
      this.persistence.timerActive.next(true);
    }
    if (e.action === 'notify'){
      this.setRemainingPathColor(e.left/1000);
      this.pathRemaining = {'stroke-dasharray': `${this.calculateDashArray(e.left/1000)}`};
    }
    if (e.action === 'done' || e.action === 'stop'){
      if(this.persistence.breakTimer.getValue() === false && !isNaN(this.startTime) && this.startTime > 0){
        this.timesUp.play();
        // this.persistence.addUnfinishedTask({id: Date.now(), createdAt: new Date(Date.now()), duration: this.startTime} as Task);
        this.db.table('unfinishedTasks').add({createdAt: new Date(Date.now()), duration: this.startTime} as Task);
      }
      this.persistence.timerActive.next(false);
    }
  }

  calculateDashArray(timeLeft: number): string {
    return `${(timeLeft/(this.countdown.config.leftTime) * 283) - 9} 283`;
  }

  setRemainingPathColor(timeLeft: number) {
    switch(timeLeft){
      case(this.colorCodes.alert.time): {this.remainingPathColor = this.colorCodes.alert.color; break;}
      case(this.colorCodes.warning.time): {this.remainingPathColor = this.colorCodes.warning.color; break;}
    }
  }
}
