import { Component, OnInit, OnDestroy } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { AppState } from '../../store/store';
import { Store, select } from '@ngrx/store';

@Component({
  selector: 'app-left-sidebar',
  templateUrl: './left-sidebar.component.html',
  styleUrls: ['./left-sidebar.component.scss']
})
export class LeftSidebarComponent implements OnInit, OnDestroy {

  name: Observable<string>;
  counter: Observable<number>;


  secondsInNumber = 0;
  seconds: number | string = '00';
  minutes: number | string = '00';
  hours: number | string = '00';
  remainingTime: string = this.hours + ':' + this.minutes + ':' + this.seconds + ' Hours';
  clockInterval: any;

  constructor(private store: Store<any>) {
    this.name = store.pipe(select((s) => s.rootReducer.testName));
    this.counter = store.pipe(select('rootReducer', 'testCounter'));
    this.secondsInNumber = 3670;
  }

  ngOnInit() {
    console.log('left sidebar.... init..');
    this.clockInterval = setInterval(() => this.startClock(), 1000);
    this.store.select<any>((state: any) => state)
      .subscribe((cs: any) => console.log(cs.rootReducer.testName));
  }

  ngOnDestroy() {
    clearInterval(this.clockInterval);
  }

  startClock() {
    let HH: number | string = 0;
    let MM: number | string = 0;
    let SS: number | string = 0;

    if (this.secondsInNumber >= (60 * 60)) {
      HH = Math.floor(this.secondsInNumber / (60 * 60));
      MM = Math.floor((this.secondsInNumber % (60 * 60)) / 60);
      SS = this.secondsInNumber % 60;
      // console.log('HH:MM:SS ===>> ' + HH + ':' + MM + ':' + SS);
    } else if (this.secondsInNumber > 60) {
      HH = 0;
      MM = Math.floor(this.secondsInNumber / 60);
      SS = this.secondsInNumber % 60;
      // console.log('MM ===>> ' + MM);
    } else if (this.secondsInNumber > 0) {
      HH = 0;
      MM = 0;
      SS = this.secondsInNumber;
      // console.log('SS ===>> ' + SS);
    } else {
      HH = 0;
      MM = 0;
      SS = 0;
      // this.remainingTime = '00:00:00 Hours';
      console.log('Time Over...');
      clearInterval(this.clockInterval);
      // alert('Time Over...');
    }

    HH = (HH < 10) ? ('0' + HH) : HH;
    MM = (MM < 10) ? ('0' + MM) : MM;
    SS = (SS < 10) ? ('0' + SS) : SS;
    this.remainingTime = HH + ':' + MM + ':' + SS + ' Hours';

    console.log('Running Clock...');
    this.secondsInNumber -= 37;
    console.log(this.secondsInNumber);
  }

}
