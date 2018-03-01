import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { AppState } from '../../store/store';
import { Store, select } from '@ngrx/store';
import * as adminActions from '../../action/admin-actions';


@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss']
})
export class ManageUsersComponent implements OnInit {

  constructor(private store: Store<any>) {
    this.store.dispatch({ type: adminActions.SIDEMENU_SELECTED, payload: 'Users' });
  }

  ngOnInit() {
  }

}
