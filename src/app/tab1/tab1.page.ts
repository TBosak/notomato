import { ChangeDetectionStrategy, Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { CountdownComponent } from 'ngx-countdown';
import { ChronographComponent } from '../chronograph/chronograph.component';
import { NotificationService } from '../services/notification.service';
import { BehaviorSubject } from 'rxjs';
import { Task } from '../models/task';
import { PersistenceService } from '../services/persistence.service';
import { liveQuery } from 'dexie';
import { DatabaseService } from '../services/database.service';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Tab1Page implements AfterViewInit, OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  @ViewChild('chronograph', { static: false }) chronograph: ChronographComponent;
  finished$: any;
  unfinished$: any;
  timerActive = false;
  cd: CountdownComponent;
  unfinishedHidden = new BehaviorSubject<boolean>(true);
  pomodoro = 1800;
  short = 300;
  long = 900;
  data: {'id': number; 'name': string}[];
  constructor(public notificationService: NotificationService, public persistence: PersistenceService, public db: DatabaseService) {
    this.data = Array(100).fill('').map((x, i) => ({id: i + 1, name: 'Item ' + (i + 1)}));
  }

  ngOnInit(): void {
  //  this.persistence.finishedTasks.subscribe( tasks => this.finished = tasks );
  //  this.persistence.unfinishedTasks.subscribe( tasks => this.unfinished = tasks );
   this.persistence.timerActive.subscribe( active => this.timerActive = active );
   this.finished$ = liveQuery(() => this.db.table('finishedTasks').toArray());
   this.unfinished$ = liveQuery(() => this.db.table('unfinishedTasks').toArray());
   this.unfinished$.subscribe( tasks => this.unfinishedHidden.next(tasks.length === 0) );
  }



   ngAfterViewInit(): void {
    this.cd = this.chronograph.countdown;
  }

  loadData(event) {
    setTimeout(() => {
      console.log('Done');
      event.target.complete();
      if (this.data.length === 1000) {
        event.target.disabled = true;
      }
    }, 500);
  }

  setTimer(time: number, brk: boolean = false){
    this.chronograph.setTime(time);
    this.persistence.breakTimer.next(brk);
    this.cd.begin();
  }

  toggleNotifications() {
    this.notificationService.notifyMe();
  }

  notifications(){
    return this.notificationService.notificationsOn();
  }

  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }
}
