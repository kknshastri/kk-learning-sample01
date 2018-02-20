import { Component, OnInit, OnDestroy } from '@angular/core';

import { NgRedux } from 'ng2-redux';
// import { INCREMENT } from '../../action/actions';
import { AppState } from '../../store/store';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-left-sidebar',
  templateUrl: './left-sidebar.component.html',
  styleUrls: ['./left-sidebar.component.scss']
})
export class LeftSidebarComponent implements OnInit, OnDestroy {

  name: Observable<string>;
  counter: Observable<number>;


  secondsInNumber: number = 0;
  seconds: number | string = '00';
  minutes: number | string = '00';
  hours: number | string = '00';
  remainingTime: string = this.hours + ':' + this.minutes + ':' + this.seconds + ' Hours';
  clockInterval: any;

  constructor(private ngRedux: NgRedux<AppState>) {
    this.name = ngRedux.select('testName');
    this.counter = ngRedux.select('testCounter');

    this.secondsInNumber = 3670;
  }

  ngOnInit() {
    console.log('left sidebar.... init..');
    this.clockInterval = setInterval(() => this.startClock(), 1000);
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


  // increment() {
  //   this.ngRedux.dispatch({type: INCREMENT});
  // };

}
