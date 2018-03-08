import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Store, select } from '@ngrx/store';
import * as adminActions from '../../action/admin-actions';


@Component({
  selector: 'app-manage-questions',
  templateUrl: './manage-questions.component.html',
  styleUrls: ['./manage-questions.component.scss']
})
export class ManageQuestionsComponent implements OnInit {

  constructor(private store: Store<any>) {
    this.store.dispatch({ type: adminActions.SIDEMENU_SELECTED, payload: 'Questions' });
  }

  ngOnInit() {
  }

}
