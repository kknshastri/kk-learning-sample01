import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
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
	loginProgress: Observable<boolean>;
	errorDetails: Observable<any>;
	userName: Observable<string>;

	loginSubscription: any;
	user = { email: '', pwd: '' };
	validUser = false; userRole = '';
	preTimerValue = 10;
	isUserRoleValidated = false;
	countdownInterval: any;
	initialLoad = true;
	quesSet = ''; userId = ''; userEmail = ''; testSubmitStatus = '';
	isQuestionLoaded = false;
	modalTitleLabel = '<br>Please wait <br><br>Login in progress...';
	showCloseButton = false;
	showCountdownTimer = false;
	questionLoadError = null;

	@ViewChild('showPopupButton') showPopupButton: ElementRef;
	@ViewChild('modalCloseButton') modalCloseButton: ElementRef;

	constructor(private store: Store<any>, private router: Router) {
		this.loginProgress = store.pipe(select((s) => s.appState.loggedInUser.isLoginProgress));
		this.errorDetails = store.pipe(select((s) => s.appState.loggedInUser.error));
		this.userName = store.pipe(select((s) => s.appState.loggedInUser.name));
	}

	ngOnInit() {
		this.loginSubscription = this.store.select<any>((state: any) => state)
			.subscribe((s: any) => {
				this.validUser = s.appState.loggedInUser.isValidUser;
				this.userRole = s.appState.loggedInUser.role;
				this.quesSet = s.appState.userStates.questionnaireSet;
				this.userId = s.appState.loggedInUser.userId;
				this.userEmail = s.appState.loggedInUser.email;
				this.testSubmitStatus = s.appState.userStates.testStatus;
				this.questionLoadError = s.appState.userStates.allQuestions.error;
				this.isQuestionLoaded = !!s.appState.userStates.allQuestions.data && (s.appState.userStates.allQuestions.data.status === 'success');

				if (!!s.appState.loggedInUser.error) {
					this.setModalStatus('<br>Login Failed! Please try again', true, false);
				}
				// Trigger only One time after clicking Login button
				if (this.validUser && !this.isUserRoleValidated) {
					this.isUserRoleValidated = true;
					if (this.userRole === 'admin') {
						this.preTimerValue = 3;
						this.setModalStatus('Redirecting to Dashboard...', false, true);
						this.countdownInterval = setInterval(() => this.startCountdown(), 1000);
					} else if (this.userRole === 'user') {
						switch (this.testSubmitStatus) {
							case 'notstarted':
								this.setModalStatus('<br>Login Successfull<br><br>Loading Questions...', false, false);
								this.loadQuestions(); break;
							case 'started':
								this.setModalStatus('<br>Your Test is already started somewhere else<br><br>Kindly contact admin', true, false); break;
							case 'completed':
								this.setModalStatus('<br><br>Your Test is already submitted successfully<br>', true, false); break;
							default: this.setModalStatus('<br>Something went wrong<br><br>Kindly contact admin or your POC', true, false);
						}

					}
				}
				// Trigger only One time after question loaded
				if (this.userRole === 'user' && this.isQuestionLoaded && this.initialLoad) {
					this.initialLoad = false;
					this.setModalStatus('Your Test is starting...', false, true);
					this.countdownInterval = setInterval(() => this.startCountdown(), 1000);
				}
				// If Question load failed...
				if (!!this.questionLoadError && this.isUserRoleValidated) {
					this.initialLoad = true; this.isUserRoleValidated = false;
					this.setModalStatus('<br>Failed to load Questions<br><br>Try again or contact your POC', true, false);
				}
			});
	}

	ngOnDestroy() {
		if (!!this.loginSubscription) { this.loginSubscription.unsubscribe(); }
	}

	userLogin() {
		this.validUser = false; this.userRole = ''; this.initialLoad = true;
		this.isUserRoleValidated = false; this.questionLoadError = null;
		this.setModalStatus('<br>Please wait <br><br>Login in progress...', false, false);
		this.showPopupButton.nativeElement.click();
		this.store.dispatch({ type: userActions.USER_LOGIN, payload: { email: this.user.email, password: this.user.pwd } });
	}

	setModalStatus(title, closeF, counterF) {
		this.modalTitleLabel = title;
		this.showCloseButton = closeF;
		this.showCountdownTimer = counterF;
	}

	startCountdown() {
		if (this.preTimerValue > 0) {
			this.preTimerValue--;
		} else {
			clearInterval(this.countdownInterval);
			this.launchDashboard();
		}
	}

	launchDashboard() {
		if (!!this.loginSubscription) { this.loginSubscription.unsubscribe(); }
		if (this.userRole === 'admin') {
			this.modalCloseButton.nativeElement.click();
			this.router.navigate(['/adminDashboard']);
		} else if (this.userRole === 'user') {
			this.modalCloseButton.nativeElement.click();
			this.store.dispatch({ type: userActions.TEST_PROGRESS, payload: true });
			this.router.navigate(['/dashboard/questionnaire']);
		}
	}

	loadQuestions() {
		this.store.dispatch({
			type: userActions.QUESTION_LOAD,
			payload: { questionset_id: this.quesSet, email: this.userEmail, user_id: this.userId }
		});
	}

}
