import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Store, select } from '@ngrx/store';
import * as userActions from '../../action/user-actions';

@Component({
  selector: 'app-user-questionnaire',
  templateUrl: './user-questionnaire.component.html',
  styleUrls: ['./user-questionnaire.component.scss']
})
export class UserQuestionnaireComponent implements OnInit {

  isTestinProgress: Observable<boolean>;
  isTestSubmitted: Observable<boolean>;
  selectedSectionName: Observable<string>;
  currQuestionCounter: Observable<number>;
  currQuestion: Observable<any>;
  currSecCounter: Observable<number>;
  currSection: Observable<any>;
  currQuesAnswer: string[] = [];

  constructor(private store: Store<any>, private router: Router) {
    // console.log('questionnaire constructure...');
    this.isTestinProgress = store.pipe(select((s) => s.appState.userStates.isTestInProgress));
    this.isTestSubmitted = store.pipe(select((s) => s.appState.userStates.isTestSubmitted));
    this.selectedSectionName = store.pipe(select((s) => s.appState.userStates.selectedSection.title));
    this.currQuestionCounter = store.pipe(select((s) => s.appState.userStates.currentQuesCounter));
    this.currQuestion = store.pipe(select((s) => s.appState.userStates.currentQuestion));
    this.currSecCounter = store.pipe(select((s) => s.appState.userStates.currentSectionCounter));
    this.currSection = store.pipe(select((s) => s.appState.userStates.selectedSection));
  }

  ngOnInit() {
    // console.log('questionnaire init...');
    let testProgress, testSubmitted;
    // this.isTestinProgress.subscribe((status) => { testProgress = status; }).unsubscribe();
    // this.isTestSubmitted.subscribe((status) => { testSubmitted = status; }).unsubscribe();
    this.store.select<any>((state: any) => state)
      .subscribe((s: any) => {
        console.log('subs >>>>>>>>>>>>>>>>>');
        testProgress = s.appState.userStates.isTestInProgress;
        testSubmitted = s.appState.userStates.isTestSubmitted;
      }).unsubscribe();
    // });

    if (!testProgress && !testSubmitted) {
      this.router.navigate(['/dashboard']);
    } else {
      console.log('Dispatching timer flag...');
      // Timer start from this point... dispatch req..
      this.store.dispatch({ type: userActions.TIMER_START_FLAG });
    }
  }

  showPrevQuestion() {
    console.log('showPrevQuestion..');
    this.store.dispatch({ type: userActions.SHOW_PREV_QUES });
  }

  showNextQuestion() {
    console.log('showNextQuestion..');
    this.store.dispatch({ type: userActions.SHOW_NEXT_QUES });
  }

  multipleAnswerChange(e, ques) {
    if (!!e.target.checked) {
      ques.answerResponse.push(e.target.value);
    } else {
      const optIndex = ques.answerResponse.indexOf(e.target.value);
      if (optIndex > -1) {
        ques.answerResponse.splice(optIndex, 1);
      }
    }
  }

  singleAnswerChange(e) {
    console.log('singleAnswerChange >>> ', e.target.value);
    if (!!e.target.value) {
      this.currQuesAnswer = [e.target.value];
    }
  }

  saveCurrQuestion() {
    console.log('saveCurrQuestion..');
    if (this.currQuesAnswer.length && !!this.currQuesAnswer[0]) {
      console.log('Dispatching action to save answer...');
      this.store.dispatch({ type: userActions.SAVE_CURR_QUES, payload: this.currQuesAnswer });
    }
  }



}
