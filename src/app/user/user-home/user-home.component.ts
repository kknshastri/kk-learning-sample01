import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Store, select } from '@ngrx/store';
import * as userActions from '../../action/user-actions';


@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.scss']
})
export class UserHomeComponent implements OnInit {

  isTestinProgress: Observable<boolean>;
  isTestSubmitted: Observable<boolean>;

  constructor(private store: Store<any>, private router: Router) {
    this.isTestinProgress = store.pipe(select((s) => s.appState.userStates.isTestInProgress));
    this.isTestSubmitted = store.pipe(select((s) => s.appState.userStates.isTestSubmitted));
  }

  ngOnInit() {
  }

  startTest() {
    console.log('Clicked on Start test button...');
    this.store.dispatch({ type: userActions.QUESTION_LOAD, payload: null });

    // Redirect after loading question...
    // this.store.dispatch({ type: userActions.TEST_PROGRESS, payload: true });
    // this.router.navigate(['/dashboard/questionnaire']);
  }

}
