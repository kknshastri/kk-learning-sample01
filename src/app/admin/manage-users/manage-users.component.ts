import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { AppState } from '../../store/store';
import { Store, select } from '@ngrx/store';
import * as actions from '../../action/actions';


@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss']
})
export class ManageUsersComponent implements OnInit {

  constructor(private store: Store<any>) {
    this.store.dispatch({ type: actions.SIDEMENU_SELECTED, payload: 'Users' });
  }

  ngOnInit() {
  }

}