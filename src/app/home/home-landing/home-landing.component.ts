import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Store, select } from '@ngrx/store';
import * as userActions from '../../action/user-actions';


@Component({
  selector: 'app-home-landing',
  templateUrl: './home-landing.component.html',
  styleUrls: ['./home-landing.component.scss']
})
export class HomeLandingComponent implements OnInit, OnDestroy {
  loginSubscription: any;
  user = { email: '', pwd: '' }
  validUser = false;

  loginProgress: Observable<boolean>;
  errorDetails: Observable<any>;
  userName: Observable<string>;

  constructor(private store: Store<any>, private router: Router) {
    this.loginProgress = store.pipe(select((s) => s.appState.loggedInUser.isLoginProgress));
    this.errorDetails = store.pipe(select((s) => s.appState.loggedInUser.error));
    this.userName = store.pipe(select((s) => s.appState.loggedInUser.name));
  }

  ngOnInit() {
    this.loginSubscription = this.store.select<any>((state: any) => state)
      .subscribe((s: any) => {
        this.validUser = s.appState.loggedInUser.isValidUser;
        if (this.validUser) {
          if (!!this.loginSubscription) {
            this.loginSubscription.unsubscribe();
          }
          let userRole = s.appState.loggedInUser.role;
          if (userRole === 'admin') {
            this.router.navigate(['/adminDashboard']);
          } else if (userRole === 'user') {
            this.router.navigate(['/dashboard']);
          }
        } else {
          this.validUser = false;
        }
      });
  }

  ngOnDestroy() {
    if (!!this.loginSubscription) {
      this.loginSubscription.unsubscribe();
    }
  }

  userLogin() {
    this.store.dispatch({ type: userActions.USER_LOGIN, payload: { "email": this.user.email, "password": this.user.pwd } });
  }

  userRegister() {
    console.log('register..');
  }

}
