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
  scoreDetails: Observable<any>;
  quesLoadSubscription: any;
  initialLoad = true;

  quesSet = '';
  userId = '';
  userEmail = '';
  testSubmitStatus = '';

  constructor(private store: Store<any>, private router: Router) {
    this.isTestinProgress = store.pipe(select((s) => s.appState.userStates.isTestInProgress));
    this.isTestSubmitted = store.pipe(select((s) => s.appState.userStates.isTestSubmitted));
    this.isQuesLoading = store.pipe(select((s) => s.appState.userStates.allQuestions.isLoading));
    this.loadQuesError = store.pipe(select((s) => s.appState.userStates.allQuestions.error));
    this.scoreDetails = store.pipe(select((s) => s.appState.userStates.testSubmitResult));
  }

  ngOnInit() {
    this.quesLoadSubscription = this.store.select<any>((state: any) => state)
      .subscribe((s: any) => {
        if (!s.appState.loggedInUser.isValidUser) {
          this.router.navigate(['/']);
        } else {
          this.quesSet = s.appState.userStates.questionnaireSet;
          this.userId = s.appState.loggedInUser.userId;
          this.userEmail = s.appState.loggedInUser.email;
          this.testSubmitStatus = s.appState.userStates.testStatus;

          // If Test is already completed and User is loging again
          if (this.testSubmitStatus === 'completed') {
            if (!!this.quesLoadSubscription) { this.quesLoadSubscription.unsubscribe(); }
          } else {
            if (!!s.appState.userStates.allQuestions.data && !!s.appState.userStates.allQuestions.data.status
              && (s.appState.userStates.allQuestions.data.status === 'success')) {
              if (this.initialLoad && !s.appState.userStates.isTestSubmitted) {
                this.store.dispatch({ type: userActions.TEST_PROGRESS, payload: true });
                this.router.navigate(['/dashboard/questionnaire']);
                this.initialLoad = false;
              } else {
                if (!!this.quesLoadSubscription && s.appState.userStates.isTestSubmitted) { this.quesLoadSubscription.unsubscribe(); }
              }
            }
          }

        }
      });
  }

  ngOnDestroy() {
    if (!!this.quesLoadSubscription) { this.quesLoadSubscription.unsubscribe(); }
  }

  startTest() {
    this.store.dispatch({
      type: userActions.QUESTION_LOAD,
      payload: { questionset_id: this.quesSet, email: this.userEmail, user_id: this.userId }
    });
  }

}
