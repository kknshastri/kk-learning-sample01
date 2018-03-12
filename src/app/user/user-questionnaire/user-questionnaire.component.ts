import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Store, select } from '@ngrx/store';
import * as userActions from '../../action/user-actions';

@Component({
  selector: 'app-user-questionnaire',
  templateUrl: './user-questionnaire.component.html',
  styleUrls: ['./user-questionnaire.component.scss']
})
export class UserQuestionnaireComponent implements OnInit, OnDestroy {

  isTestinProgress: Observable<boolean>;
  isTestSubmitted: Observable<boolean>;
  selectedSectionName: Observable<string>;
  currQuestionCounter: Observable<number>;
  currQuestion: Observable<any>;
  currSecCounter: Observable<number>;
  currSection: Observable<any>;
  currQuesAnswer: string[] = [];
  nextQuestion: Observable<boolean>;
  prevQuestion: Observable<boolean>;
  disableSaveButon = true;

  subscription1: any;

  constructor(private store: Store<any>, private router: Router) {
    this.isTestinProgress = store.pipe(select((s) => s.appState.userStates.isTestInProgress));
    this.isTestSubmitted = store.pipe(select((s) => s.appState.userStates.isTestSubmitted));
    this.selectedSectionName = store.pipe(select((s) => s.appState.userStates.selectedSection.title));
    this.currQuestionCounter = store.pipe(select((s) => s.appState.userStates.currentQuesCounter));
    this.currQuestion = store.pipe(select((s) => s.appState.userStates.currentQuestion));
    this.currSecCounter = store.pipe(select((s) => s.appState.userStates.currentSectionCounter));
    this.currSection = store.pipe(select((s) => s.appState.userStates.selectedSection));
    this.nextQuestion = store.pipe(select((s) => s.appState.userStates.nextPointer));
    this.prevQuestion = store.pipe(select((s) => s.appState.userStates.prevPointer));
  }

  ngOnInit() {
    let testProgress, testSubmitted;
    this.subscription1 = this.store.select<any>((state: any) => state)
      .subscribe((s: any) => {
        testProgress = s.appState.userStates.isTestInProgress;
        testSubmitted = s.appState.userStates.isTestSubmitted;
        this.disableSaveButon = true;
        this.currQuesAnswer = !!s.appState.userStates.currentQuestion ? s.appState.userStates.currentQuestion.answer.answer_value : [];
        if (!!testSubmitted && !!this.subscription1) this.subscription1.unsubscribe();
      });

    if (!testProgress && !testSubmitted) {
      this.router.navigate(['/']);
    } else {
      // Timer start from this point... dispatch req..
      this.store.dispatch({ type: userActions.TIMER_START_FLAG });
    }
  }

  ngOnDestroy() {
    if (!!this.subscription1) this.subscription1.unsubscribe();
  }

  singleAnswerChange(e) {
    if (!!e.target.value) {
      this.currQuesAnswer = [e.target.value];
      this.disableSaveButon = false;
    }
  }

  multipleAnswerChange(e) {
    this.disableSaveButon = false;
    if (!!e.target.checked) {
      const optIndex = this.currQuesAnswer.indexOf(e.target.value);
      if (optIndex === -1) {
        this.currQuesAnswer = [...this.currQuesAnswer, e.target.value];
      }
    } else {
      const optIndex = this.currQuesAnswer.indexOf(e.target.value);
      if (optIndex > -1) {
        this.currQuesAnswer = this.currQuesAnswer.splice(optIndex, 1);
      }
    }
  }

  textAnswerChange(e) {
    this.currQuesAnswer = !!(e.target.value).trim() ? [(e.target.value).trim()] : [];
  }

  saveCurrAnswer() {
    this.store.dispatch({ type: userActions.SAVE_CURR_ANSWER, payload: this.currQuesAnswer });
  }

  resetCurrAnswer() {
    this.currQuesAnswer = [];
    this.store.dispatch({ type: userActions.SAVE_CURR_ANSWER, payload: [] });
  }

  navigateQuestion(direction) {
    this.store.dispatch({ type: userActions.NAVIGATE_QUES, payload: direction });
  }

}
