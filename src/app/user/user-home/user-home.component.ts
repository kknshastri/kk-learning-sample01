import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Store, select } from '@ngrx/store';
import * as userActions from '../../action/user-actions';


@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.scss']
})
export class UserHomeComponent implements OnInit, OnDestroy {

  isTestinProgress: Observable<boolean>;
  isTestSubmitted: Observable<boolean>;
  isQuesLoading: Observable<boolean>;
  loadQuesError: Observable<any>;
  quesLoadSubscription: any;
  initialLoad = true;

  constructor(private store: Store<any>, private router: Router) {
    this.isTestinProgress = store.pipe(select((s) => s.appState.userStates.isTestInProgress));
    this.isTestSubmitted = store.pipe(select((s) => s.appState.userStates.isTestSubmitted));
    this.isQuesLoading = store.pipe(select((s) => s.appState.userStates.allQuestions.isLoading));
    this.loadQuesError = store.pipe(select((s) => s.appState.userStates.allQuestions.error));
  }

  ngOnInit() {
    console.log('User Home init...');

    this.quesLoadSubscription = this.store.select<any>((state: any) => state)
      .subscribe((s: any) => {
        console.log('>>>> User home subscribe >>>>>>');
        if (!!s.appState.userStates.allQuestions.data && !!s.appState.userStates.allQuestions.data.status
          && (s.appState.userStates.allQuestions.data.status === 'success')) {
          console.log('success >>>>>');

          if (this.initialLoad && !s.appState.userStates.isTestSubmitted) {
            console.log('Initial load and dispatch TEST_PROGRESS');
            this.store.dispatch({ type: userActions.TEST_PROGRESS, payload: true });
            this.router.navigate(['/dashboard/questionnaire']);
            this.initialLoad = false;
          } else {
            if (!!this.quesLoadSubscription && s.appState.userStates.isTestSubmitted) {
              console.log('User Home Unsubscribing here....');
              this.quesLoadSubscription.unsubscribe();
            }
          }
        }
      });
  }

  ngOnDestroy() {
    console.log('User Home destroy...');
    if (!!this.quesLoadSubscription) {
      console.log('User home unsubscribe in destroy...');
      this.quesLoadSubscription.unsubscribe();
    }
  }

  startTest() {
    console.log('Clicked on Start test button...');
    this.store.dispatch({ type: userActions.QUESTION_LOAD, payload: null });
  }

}
