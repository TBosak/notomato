/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/semi */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable prefer-arrow/prefer-arrow-functions */
import { Component, OnInit, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { CountdownComponent, CountdownConfig, CountdownEvent } from 'ngx-countdown';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-chronograph',
  templateUrl: './chronograph.component.html',
  styleUrls: ['./chronograph.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChronographComponent implements OnInit {
  @ViewChild('cd', { static: false }) countdown: CountdownComponent;
  startTime: number;
  countDownConfig: BehaviorSubject<CountdownConfig> = new BehaviorSubject<CountdownConfig>({
    leftTime: 30,
    format: 'mm:ss'
  });
  defaults: any = {};

  constructor() {
  }

  ngOnInit(): void {
    this.countDownConfig.subscribe(config => {
      this.startTime = config.leftTime;
    })
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
    if (e.action === 'done') {
    }
    console.log('Actions', e);
  }
}
