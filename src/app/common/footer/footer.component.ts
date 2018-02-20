import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { NgRedux } from 'ng2-redux';
import { INCREMENT, DECREMENT } from '../../action/actions';
import { AppState } from '../../store/store';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor(private ngRedux: NgRedux<AppState>) {
  }

  ngOnInit() {
  }

  loadNextQuestion() {
    this.ngRedux.dispatch({ type: INCREMENT });
  }

  loadPreviousQuestion() {
    this.ngRedux.dispatch({ type: DECREMENT });
  }

}
