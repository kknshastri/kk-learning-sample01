import { Component, OnInit, OnDestroy } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Store, select } from '@ngrx/store';
import * as userActions from '../../action/user-actions';


@Component({
  selector: 'app-user-sidebar',
  templateUrl: './user-sidebar.component.html',
  styleUrls: ['./user-sidebar.component.scss']
})
export class UserSidebarComponent implements OnInit, OnDestroy {

  expandQuestionnaire = true;
  selectedSectionIdx = 0;
  selectedQuesIdx = 0;
  questionnaireStructure = {
    questionnaireName: 'Questionnaire Set Three',
    sections: [
      {
        sectionName: 'Section One',
        sectionExpanded: true,
        questions: [
          {
            qid: '1',
            isAnswered: true,
            description: 'q00. What are the modules in SAP? Select correct answers from below.'
          },
          {
            qid: '2',
            isAnswered: false,
            description: 'q01. What are the..'
          },
          {
            qid: '3',
            isAnswered: true,
            description: 'q02. What are the..'
          },
          {
            qid: '4',
            isAnswered: false,
            description: 'q03. What are the..'
          }
        ]
      },
      {
        sectionName: 'Section Two',
        sectionExpanded: false,
        questions: [
          {
            qid: '5',
            isAnswered: false,
            description: 'q10. What are the..'
          },
          {
            qid: '6',
            isAnswered: true,
            description: 'q11. What are the..'
          }
        ]
      },
      {
        sectionName: 'Section Three',
        sectionExpanded: false,
        questions: [
          {
            qid: '7',
            isAnswered: false,
            description: 'q20. What are the..'
          },
          {
            qid: '8',
            isAnswered: false,
            description: 'q21. What are the..'
          }
        ]
      },
      {
        sectionName: 'Section Four',
        sectionExpanded: false,
        questions: [
          {
            qid: '9',
            isAnswered: false,
            description: 'q30. What are the..'
          },
          {
            qid: '10',
            isAnswered: false,
            description: 'q31. What are the..'
          }
        ]
      },
      {
        sectionName: 'Section Five',
        sectionExpanded: false,
        questions: [
          {
            qid: '11',
            isAnswered: false,
            description: 'q40. What are the..'
          },
          {
            qid: '12',
            isAnswered: false,
            description: 'q41. What are the..'
          }
        ]
      }
    ]
  };

  secondsInNumber = 0;
  seconds: number | string = '00';
  minutes: number | string = '00';
  hours: number | string = '00';
  remainingTime: string = this.hours + ':' + this.minutes + ':' + this.seconds + ' Hours';
  clockInterval: any;

  isTestinProgress: Observable<boolean>;
  isTestSubmitted: Observable<boolean>;
  timerSubscription: any;
  timerStarted = false;

  constructor(private store: Store<any>) {
    console.log('sidebar constructor >>>>>>>>>>>>>>>>>>>>');
    this.secondsInNumber = 3670;
    this.isTestinProgress = store.pipe(select((s) => s.appState.userStates.isTestInProgress));
    this.isTestSubmitted = store.pipe(select((s) => s.appState.userStates.isTestSubmitted));
  }

  ngOnInit() {
    console.log('sidebar init >>>>>>>>>>>>>>>>>>>>');
    // this.clockInterval = setInterval(() => this.startClock(), 1000);
    this.timerSubscription = this.store.select<any>((state: any) => state)
      .subscribe((s: any) => {
        console.log('Sidebar... inside subscribe...');
        let timerStatus = s.appState.userStates.timerStarted;
        if (timerStatus && !this.timerStarted) {
          console.log('Timer is starting now >>>>>>>>>>>');
          this.startTimer();
          this.timerStarted = true;
        }
      });
  }

  ngOnDestroy() {
    console.log('Destroying....');
    this.timerSubscription.unsubscribe();
  }

  selectedSection(SecIdx, sectionDetails) {
    this.selectedSectionIdx = SecIdx;
    this.selectedQuesIdx = -1;
    this.questionnaireStructure.sections.map((section, idx) => {
      if (idx === SecIdx) {
        section.sectionExpanded = !section.sectionExpanded;
      } else {
        section.sectionExpanded = false;
      }
      return section;
    });
    console.log('selected sec ===');
    console.log(sectionDetails.sectionName);
    this.store.dispatch({ type: userActions.TEST_SELECTED_SECTION, payload: [sectionDetails, SecIdx] });
  }

  selectedQuestion(ques, quesIdx) {
    console.log('Selected section idx >>> ' + this.selectedSectionIdx);
    console.log('Selected question idx >>> ' + quesIdx);
    this.selectedQuesIdx = quesIdx;
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
      // console.log('HH:MM:SS ===>> ' + HH + ':' + MM + ':' + SS);
    } else if (this.secondsInNumber > 60) {
      HH = 0;
      MM = Math.floor(this.secondsInNumber / 60);
      SS = this.secondsInNumber % 60;
      // console.log('MM ===>> ' + MM);
    } else if (this.secondsInNumber > 0) {
      HH = 0;
      MM = 0;
      SS = this.secondsInNumber;
      // console.log('SS ===>> ' + SS);
    } else {
      HH = 0;
      MM = 0;
      SS = 0;
      // this.remainingTime = '00:00:00 Hours';
      console.log('Time Over...');
      clearInterval(this.clockInterval);
      this.timerSubscription.unsubscribe();   // Check once... ngDestroy..
      // alert('Time Over...');
      // Call service to submit test... TODO...
    }

    HH = (HH < 10) ? ('0' + HH) : HH;
    MM = (MM < 10) ? ('0' + MM) : MM;
    SS = (SS < 10) ? ('0' + SS) : SS;
    this.remainingTime = HH + ':' + MM + ':' + SS + ' Hours';
    // console.log('Running Clock...');
    this.secondsInNumber -= 1;
  }

  startTimer() {
    this.clockInterval = setInterval(() => this.startClock(), 1000);
  }

}
