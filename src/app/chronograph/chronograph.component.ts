/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/semi */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable prefer-arrow/prefer-arrow-functions */
import { Component, OnInit, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { CountdownComponent, CountdownConfig, CountdownEvent } from 'ngx-countdown';
import { BehaviorSubject, of } from 'rxjs';

@Component({
  selector: 'app-chronograph',
  templateUrl: './chronograph.component.html',
  styleUrls: ['./chronograph.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChronographComponent implements OnInit {
  @ViewChild('cd', { static: false }) countdown: CountdownComponent;
  startTime: number;
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
    leftTime: 30,
    format: 'mm:ss',
    notify: this.notifications
  });
  defaults: any = {};

  constructor() {
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
  }

  stopTimer() {
    this.countdown.stop();
  }

  resetTimer() {
    this.countdown.restart();
  }

  pauseTimer() {
    this.countdown.pause();
  }

  resumeTimer() {
    this.countdown.resume();
  }

  setTime(time) {
    this.countDownConfig.next({
      leftTime: time,
      format: 'mm:ss'
    })
  }

  handleEvent(e: CountdownEvent) {
    if (e.action === 'start') {this.remainingPathColor = this.colorCodes.base.color;}
    if (e.action === 'notify'){
      this.setRemainingPathColor(e.left/1000);
      this.pathRemaining = {'stroke-dasharray': `${this.calculateDashArray(e.left/1000)}`};
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
