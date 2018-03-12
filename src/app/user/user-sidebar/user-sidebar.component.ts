import { Component, OnInit, OnDestroy } from '@angular/core';

import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Store, select } from '@ngrx/store';
import * as userActions from '../../action/user-actions';


@Component({
  selector: 'app-user-sidebar',
  templateUrl: './user-sidebar.component.html',
  styleUrls: ['./user-sidebar.component.scss']
})
export class UserSidebarComponent implements OnInit, OnDestroy {

  currQuestionCounter: Observable<number>;
  currSecCounter: Observable<number>;

  expandQuestionnaire = true;


  secondsInNumber = 0;
  warningOne = 10 * 60;   // First Warning when time <= 10 Minutes
  warningTwo = 5 * 60;    // Second Warning when time <= 5 Minutes
  warningIndicator = '';  // Class for warning indicator
  seconds: number | string = '00';
  minutes: number | string = '00';
  hours: number | string = '00';
  remainingTime: string = this.hours + ':' + this.minutes + ':' + this.seconds + ' Hours';
  clockInterval: any;

  questionSet: Observable<any>;
  isTestinProgress: Observable<boolean>;
  isTestSubmitted: Observable<boolean>;
  timerSubscription: any;
  timerStarted = false;

  testResponseData: any;
  userId = '';
  userEmail = '';
  testSubmitStatus = '';
  testDuration = 0;

  constructor(private store: Store<any>, private router: Router) {
    // this.secondsInNumber = 5.1 * 60;   // 3670;   // Test Duration in seconds.
    this.isTestinProgress = store.pipe(select((s) => s.appState.userStates.isTestInProgress));
    this.isTestSubmitted = store.pipe(select((s) => s.appState.userStates.isTestSubmitted));
    this.questionSet = store.pipe(select((s) => s.appState.userStates.allQuestions.data.question_set));
    this.currQuestionCounter = store.pipe(select((s) => s.appState.userStates.currentQuesCounter));
    this.currSecCounter = store.pipe(select((s) => s.appState.userStates.currentSectionCounter));
  }

  ngOnInit() {
    this.timerSubscription = this.store.select<any>((state: any) => state)
      .subscribe((s: any) => {
        this.userId = s.appState.loggedInUser.userId;
        this.userEmail = s.appState.loggedInUser.email;
        this.testSubmitStatus = s.appState.userStates.testStatus;
        this.testDuration = s.appState.userStates.testDuration;

        const timerStatus = s.appState.userStates.timerStarted;
        if (timerStatus && !this.timerStarted) {
          this.secondsInNumber = this.testDuration * 60;
          this.startTimer();
          this.timerStarted = true;
        }

        if (s.appState.userStates.testStatus === 'completed') {
          if (!!this.timerSubscription) this.timerSubscription.unsubscribe();
        } else if (!!s.appState.userStates.allQuestions.data) {
          this.testResponseData = s.appState.userStates.allQuestions.data;
        }
      });
  }

  ngOnDestroy() {
    if (!!this.timerSubscription) this.timerSubscription.unsubscribe();
  }

  selectedSection(SecIdx, sectionDetails) {
    this.store.dispatch({ type: userActions.TEST_SELECTED_SECTION, payload: [sectionDetails, SecIdx] });
  }

  selectedQuestion(ques, quesIdx) {
    this.store.dispatch({ type: userActions.TEST_SELECTED_QUESTION, payload: [ques, quesIdx] });
  }

  startClock() {
    let HH: number | string = 0;
    let MM: number | string = 0;
    let SS: number | string = 0;

    if (this.secondsInNumber >= (60 * 60)) {
      HH = Math.floor(this.secondsInNumber / (60 * 60));
      MM = Math.floor((this.secondsInNumber % (60 * 60)) / 60);
      SS = this.secondsInNumber % 60;
    } else if (this.secondsInNumber > 60) {
      HH = 0;
      MM = Math.floor(this.secondsInNumber / 60);
      SS = this.secondsInNumber % 60;
    } else if (this.secondsInNumber > 0) {
      HH = 0;
      MM = 0;
      SS = this.secondsInNumber;
    } else {
      HH = 0;
      MM = 0;
      SS = 0;
      // this.remainingTime = '00:00:00 Hours';
      // console.log('Time Over...');
      this.autoSubmitAnswers();
    }

    HH = (HH < 10) ? ('0' + HH) : HH;
    MM = (MM < 10) ? ('0' + MM) : MM;
    SS = (SS < 10) ? ('0' + SS) : SS;
    this.remainingTime = HH + ':' + MM + ':' + SS + ' Hours';
    this.secondsInNumber = (this.secondsInNumber > 0) ? (this.secondsInNumber - 1) : 0;
    this.warningIndicator = (this.secondsInNumber < this.warningTwo) ?
      'warning2' : ((this.secondsInNumber < this.warningOne) ? 'warning1' : '');
  }

  startTimer() {
    this.clockInterval = setInterval(() => this.startClock(), 1000);
  }

  autoSubmitAnswers() {
    clearInterval(this.clockInterval);
    if (!!this.timerSubscription) this.timerSubscription.unsubscribe();

    if (this.testSubmitStatus === 'started') {
      this.store.dispatch({
        type: userActions.TEST_SUBMITTED,
        payload: Object.assign({}, this.testResponseData, { email: this.userEmail, user_id: this.userId, questionset_id: this.testResponseData.questionset_id, status: '' })
      });
    }
  }

  // sectionAnswered(sec): boolean {
  //   console.log('Checking if all ques answered ---------=->>>');
  //   return true;
  // }


}

