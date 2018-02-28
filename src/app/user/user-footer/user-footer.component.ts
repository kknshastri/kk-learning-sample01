import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Store, select } from '@ngrx/store';
import * as actions from '../../action/actions';

@Component({
  selector: 'app-user-footer',
  templateUrl: './user-footer.component.html',
  styleUrls: ['./user-footer.component.scss']
})
export class UserFooterComponent implements OnInit {

  isTestinProgress: Observable<boolean>;

  constructor(private store: Store<any>) {
    this.isTestinProgress = store.pipe(select((s) => s.appState.loggedInUser.isTestInProgress));
  }

  ngOnInit() {
  }

  submitTest() {
    console.log('Submit Test button clicked...');
    this.store.dispatch({ type: actions.TEST_SUBMIT_TRIGGERED, payload: true });
  }

}
