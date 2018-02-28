import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Store, select } from '@ngrx/store';
import * as actions from '../../action/actions';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.scss']
})
export class UserHomeComponent implements OnInit {

  isTestinProgress: Observable<boolean>;
  isTestSubmitted: Observable<boolean>;

  constructor(private store: Store<any>, private router: Router) {
    this.isTestinProgress = store.pipe(select((s) => s.appState.loggedInUser.isTestInProgress));
    this.isTestSubmitted = store.pipe(select((s) => s.appState.loggedInUser.isTestSubmitted));
  }

  ngOnInit() {
  }

  startTest() {
    console.log('Clicked on Start test button...');
    this.store.dispatch({ type: actions.TEST_PROGRESS, payload: true });
    this.router.navigate(['/dashboard/questionnaire']);
  }

}
