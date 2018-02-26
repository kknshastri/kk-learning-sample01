import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { AppState } from '../../store/store';
import { Store, select } from '@ngrx/store';
import * as actions from '../../action/actions';


@Component({
  selector: 'app-manage-questions',
  templateUrl: './manage-questions.component.html',
  styleUrls: ['./manage-questions.component.scss']
})
export class ManageQuestionsComponent implements OnInit {

  constructor(private store: Store<any>) {
    this.store.dispatch({ type: actions.SIDEMENU_SELECTED, payload: 'Questions' });
  }

  ngOnInit() {
  }

}
