import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Store, select } from '@ngrx/store';
import * as userActions from '../../action/user-actions';

@Component({
	selector: 'app-user-footer',
	templateUrl: './user-footer.component.html',
	styleUrls: ['./user-footer.component.scss']
})
export class UserFooterComponent implements OnInit, OnDestroy {

	isTestinProgress: Observable<boolean>;
	testResponseData: any;
	testRespSubscription: any;
	userId = '';
	userEmail = '';

	constructor(private store: Store<any>, private router: Router) {
		this.isTestinProgress = store.pipe(select((s) => s.appState.userStates.isTestInProgress));
	}

	ngOnInit() {
		this.testRespSubscription = this.store.select<any>((state: any) => state)
			.subscribe((s: any) => {
				this.userId = s.appState.loggedInUser.userId;
				this.userEmail = s.appState.loggedInUser.email;
				if (s.appState.userStates.testStatus === 'completed') {
					if (!!this.testRespSubscription) { this.testRespSubscription.unsubscribe(); }
					this.router.navigate(['/dashboard']);
				} else if (!!s.appState.userStates.allQuestions.data) {
					this.testResponseData = s.appState.userStates.allQuestions.data;
				}
			});
	}

	ngOnDestroy() {
		if (!!this.testRespSubscription) { this.testRespSubscription.unsubscribe(); }
	}

	submitTest() {
		this.store.dispatch({
			type: userActions.TEST_SUBMITTED,
			payload: Object.assign({}, this.testResponseData, {
				email: this.userEmail, user_id: this.userId,
				questionset_id: this.testResponseData.questionset_id, status: ''
			})
		});
	}

}
