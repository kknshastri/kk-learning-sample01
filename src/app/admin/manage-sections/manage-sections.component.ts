import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { AppState } from '../../store/store';
import { Store, select } from '@ngrx/store';
import * as actions from '../../action/actions';


@Component({
  selector: 'app-manage-sections',
  templateUrl: './manage-sections.component.html',
  styleUrls: ['./manage-sections.component.scss']
})
export class ManageSectionsComponent implements OnInit {

  constructor(private store: Store<any>) {
    this.store.dispatch({ type: actions.SIDEMENU_SELECTED, payload: 'Sections' });
  }

  ngOnInit() {
  }

}
