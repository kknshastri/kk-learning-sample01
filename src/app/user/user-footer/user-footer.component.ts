import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Store, select } from '@ngrx/store';
import * as userActions from '../../action/user-actions';

@Component({
  selector: 'app-user-footer',
  templateUrl: './user-footer.component.html',
  styleUrls: ['./user-footer.component.scss']
})
export class UserFooterComponent implements OnInit {

  isTestinProgress: Observable<boolean>;

  constructor(private store: Store<any>, private router: Router) {
    this.isTestinProgress = store.pipe(select((s) => s.appState.userStates.isTestInProgress));
  }

  ngOnInit() {
  }

  submitTest() {
    console.log('Submit Test button clicked...');
    this.store.dispatch({ type: userActions.TEST_SUBMITTED, payload: true });
    this.router.navigate(['/dashboard']);
  }

}
