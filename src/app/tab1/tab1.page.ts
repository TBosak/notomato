import { ChangeDetectionStrategy, Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { CountdownComponent } from 'ngx-countdown';
import { ChronographComponent } from '../chronograph/chronograph.component';
import { BehaviorSubject } from 'rxjs';
import { PersistenceService } from '../services/persistence.service';
import { liveQuery } from 'dexie';
import { DatabaseService } from '../services/database.service';
import { MatDialog } from '@angular/material/dialog';
import { SettingsComponent } from '../settings/settings.component';
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
  timerPaused = false;
  cd: CountdownComponent;
  unfinishedHidden = new BehaviorSubject<boolean>(true);
  data: {'id': number; 'name': string}[];

  constructor(public persistence: PersistenceService, public db: DatabaseService, public dialog: MatDialog) {
    this.data = Array(100).fill('').map((x, i) => ({id: i + 1, name: 'Item ' + (i + 1)}));
  }

  ngOnInit(): void {
   this.persistence.timerActive.subscribe( active => this.timerActive = active );
   this.persistence.timerPaused.subscribe( paused => this.timerPaused = paused );
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

  openSettings(){
    this.dialog.open(SettingsComponent);
  }

  setTimer(time: number, brk: boolean = false){
    if(!brk){
      const tag = prompt("Enter a tag for tracking your task:", "Documentation");
      this.persistence.currentTag.next(tag);
    }
    else{
      this.persistence.currentTag.next(null);
    }
    this.chronograph.setTime(time);
    this.persistence.breakTimer.next(brk);
    this.cd.begin();
  }

  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }
}
