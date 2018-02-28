import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Store, select } from '@ngrx/store';

@Component({
  selector: 'app-user-questionnaire',
  templateUrl: './user-questionnaire.component.html',
  styleUrls: ['./user-questionnaire.component.scss']
})
export class UserQuestionnaireComponent implements OnInit {

  isTestinProgress: Observable<boolean>;
  isTestSubmitted: Observable<boolean>;
  isTestSubmitTriggered: Observable<boolean>;

  constructor(private store: Store<any>) {
    this.isTestinProgress = store.pipe(select((s) => s.appState.loggedInUser.isTestInProgress));
    this.isTestSubmitted = store.pipe(select((s) => s.appState.loggedInUser.isTestSubmitted));
    this.isTestSubmitTriggered = store.pipe(select((s) => s.appState.loggedInUser.isSubmitTriggered));
  }


  ngOnInit() {
    console.log('Questionnaire init...');
  }

}
