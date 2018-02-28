import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Store, select } from '@ngrx/store';

@Component({
  selector: 'app-user-sidebar',
  templateUrl: './user-sidebar.component.html',
  styleUrls: ['./user-sidebar.component.scss']
})
export class UserSidebarComponent implements OnInit {

  expandQuestionnaire = true;
  selectedSectionIdx = -1;
  selectedQuesIdx = '1';
  questionnaireStructure = {
    questionnaireName: 'Questionnaire Set Three',
    sections: [
      {
        sectionName: 'Section One',
        sectionExpanded: false,
        questions: [
          {
            qid: '1',
            isAnswered: true,
            description: 'What are the..'
          },
          {
            qid: '2',
            isAnswered: false,
            description: 'What are the..'
          },
          {
            qid: '3',
            isAnswered: true,
            description: 'What are the..'
          },
          {
            qid: '4',
            isAnswered: false,
            description: 'What are the..'
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
            description: 'What are the..'
          },
          {
            qid: '6',
            isAnswered: true,
            description: 'What are the..'
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
            description: 'What are the..'
          },
          {
            qid: '8',
            isAnswered: false,
            description: 'What are the..'
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
            description: 'What are the..'
          },
          {
            qid: '10',
            isAnswered: false,
            description: 'What are the..'
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
            description: 'What are the..'
          },
          {
            qid: '12',
            isAnswered: false,
            description: 'What are the..'
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

  constructor(private store: Store<any>) {
    this.isTestinProgress = store.pipe(select((s) => s.appState.loggedInUser.isTestInProgress));
    this.isTestSubmitted = store.pipe(select((s) => s.appState.loggedInUser.isTestSubmitted));
    this.secondsInNumber = 3670;
  }

  ngOnInit() {
    console.log('Inside init....');
    this.clockInterval = setInterval(() => this.startClock(), 1000);
  }

  selectedSection(SecIdx) {
    this.selectedSectionIdx = SecIdx;
    this.questionnaireStructure.sections.map((section, idx) => {
      if (idx === SecIdx) {
        section.sectionExpanded = !section.sectionExpanded;
      } else {
        section.sectionExpanded = false;
      }
      return section;
    });
  }

  selectedQuestion(ques) {
    console.log('selectedQuestion..');
    console.log(ques);
    this.selectedQuesIdx = ques.qid;
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
      // alert('Time Over...');
    }

    HH = (HH < 10) ? ('0' + HH) : HH;
    MM = (MM < 10) ? ('0' + MM) : MM;
    SS = (SS < 10) ? ('0' + SS) : SS;
    this.remainingTime = HH + ':' + MM + ':' + SS + ' Hours';
    // console.log('Running Clock...');
    this.secondsInNumber -= 1;
  }

}
