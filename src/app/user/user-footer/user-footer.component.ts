import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Store, select } from '@ngrx/store';
import * as userActions from '../../action/user-actions';

@Component({
  selector: 'app-user-footer',
  templateUrl: './user-footer.component.html',
  styleUrls: ['./user-footer.component.scss']
})
export class UserFooterComponent implements OnInit, OnDestroy {

  isTestinProgress: Observable<boolean>;
  testResponseData: any;
  testRespSubscription: any;

  constructor(private store: Store<any>, private router: Router) {
    this.isTestinProgress = store.pipe(select((s) => s.appState.userStates.isTestInProgress));
  }

  ngOnInit() {
    this.testRespSubscription = this.store.select<any>((state: any) => state)
      .subscribe((s: any) => {
        console.log('Footer subscribe --------------');
        if (!!s.appState.userStates.allQuestions.data) {
          this.testResponseData = s.appState.userStates.allQuestions.data.question_set;
        }
      });
  }

  ngOnDestroy() {
    if (!!this.testRespSubscription) {
      this.testRespSubscription.unsubscribe();
    }
  }

  submitTest() {
    console.log('Submit Test button clicked...');
    if (!!this.testRespSubscription) {
      this.testRespSubscription.unsubscribe();
    }
    console.log('Saved Answers ==>> ==>> ==>> ');
    console.log(this.testResponseData);   // PAYLOAD
    this.store.dispatch({ type: userActions.TEST_SUBMITTED, payload: this.testResponseData });

    // IN PROGRESS: DONT DELETE
    // this.router.navigate(['/dashboard']);
  }

}
