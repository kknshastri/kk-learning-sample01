import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { AppState } from '../../store/store';
import { Store, select } from '@ngrx/store';
import * as actions from '../../action/actions';


@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.scss']
})
export class AdminSidebarComponent implements OnInit {
  activeMenu: Observable<string>;

  constructor(private router: Router, private store: Store<any>) {
    this.activeMenu = store.pipe(
      select((s) => s.rootReducer.adminStates.selectedSidebarMenu)
    );
  }

  ngOnInit() {
  }

  manageQuestions() {
    console.log('Manage Questions...');
    this.router.navigate(['/adminDashboard/manageQues']);
    this.store.dispatch({ type: actions.SIDEMENU_SELECTED, payload: 'Questions' });
  }

  manageSections() {
    console.log('Manage Sections...');
    this.router.navigate(['/adminDashboard/manageSections']);
    this.store.dispatch({ type: actions.SIDEMENU_SELECTED, payload: 'Sections' });
  }

  manageQuestionnaire() {
    console.log('Manage Questionnaire...');
    this.router.navigate(['/adminDashboard/manageQuestionnaire']);
    this.store.dispatch({ type: actions.SIDEMENU_SELECTED, payload: 'Questionnaire' });
  }

  manageUsers() {
    console.log('Manage Users...');
    this.router.navigate(['/adminDashboard/manageUsers']);
    this.store.dispatch({ type: actions.SIDEMENU_SELECTED, payload: 'Users' });
  }

}
