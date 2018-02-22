import { Component, OnInit } from '@angular/core';

import { NgRedux } from 'ng2-redux';
// import { INCREMENT } from '../../action/actions';
import { AppState } from '../../store/store';
// import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  // name: Observable<string>;
  // counter: Observable<number>;

  constructor(private ngRedux: NgRedux<AppState>) {
    // this.name = ngRedux.select('testName');
    // this.counter = ngRedux.select('testCounter');
  }

  ngOnInit() {
  }

  // increment() {
  //   this.ngRedux.dispatch({type: INCREMENT});
  // };

}
