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
    console.log('questionnaire init...');
    let testProgress, testSubmitted;
    // this.isTestinProgress.subscribe((status) => { testProgress = status; }).unsubscribe();
    // this.isTestSubmitted.subscribe((status) => { testSubmitted = status; }).unsubscribe();
    this.subscription1 = this.store.select<any>((state: any) => state)
      .subscribe((s: any) => {
        console.log('subscribe >>>>>>>>>>>>>>>>>');
        testProgress = s.appState.userStates.isTestInProgress;
        testSubmitted = s.appState.userStates.isTestSubmitted;
        this.disableSaveButon = true;
        if (!!s.appState.userStates.currentQuestion) {
          this.currQuesAnswer = s.appState.userStates.currentQuestion.answer.answer_value;
        } else {
          this.currQuesAnswer = [];
        }

        if (!!testSubmitted && !!this.subscription1) {
          console.log('>>>>>>> Test submitted ---- unsubscribe.... ');
          this.subscription1.unsubscribe();
        }
        // }).unsubscribe();
      });

    if (!testProgress && !testSubmitted) {
      this.router.navigate(['/dashboard']);
    } else {
      console.log('Dispatching timer flag...');
      // Timer start from this point... dispatch req..
      this.store.dispatch({ type: userActions.TIMER_START_FLAG });
    }
  }

  ngOnDestroy() {
    this.subscription1.unsubscribe();
  }

  singleAnswerChange(e) {
    console.log('singleAnswerChange >>> ', e.target.value);
    if (!!e.target.value) {
      this.currQuesAnswer = [e.target.value];
      this.disableSaveButon = false;
    }
  }

  multipleAnswerChange(e) {
    console.log('multipleAnswerChange >>> ', e.target.value);
    console.log('Multiple answer before ========>>> ');
    console.log(this.currQuesAnswer);

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
    console.log('Multiple answer after ========>>> ');
    console.log(this.currQuesAnswer);
  }

  textAnswerChange(e) {
    console.log('textAnswerChange >>> ', e.target.value);
    // if (!!(e.target.value).trim()) {
    this.currQuesAnswer = !!(e.target.value).trim() ? [(e.target.value).trim()] : [];
    // }
  }

  saveCurrAnswer() {
    console.log('Saving currQuesAnswer..>>>>>>.', this.currQuesAnswer);
    // if (this.currQuesAnswer.length) {
    console.log('Dispatching action to save answer...');
    this.store.dispatch({ type: userActions.SAVE_CURR_ANSWER, payload: this.currQuesAnswer });
    // }
  }

  resetCurrAnswer() {
    console.log('Resetting curr answer...');
    this.currQuesAnswer = [];
    this.store.dispatch({ type: userActions.SAVE_CURR_ANSWER, payload: this.currQuesAnswer });
  }

  navigateQuestion(direction) {
    console.log('navigateQuestion...');
    this.store.dispatch({ type: userActions.NAVIGATE_QUES, payload: direction });
  }



}
