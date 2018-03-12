import { Effect, Actions } from '@ngrx/effects';
import { Injectable } from '@angular/core';

import { QuestionService } from '../services/question.service';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/timer';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import * as userActions from '../action/user-actions';
import * as adminActions from '../action/admin-actions';
import { ResponseMapper } from './response.mapper';

@Injectable()
export class SampleEffects {
    constructor(private action: Actions, private store: Store<any>, private quesService: QuestionService) { }

    @Effect()
    userLogin: Observable<any> = this.action
        .ofType(userActions.USER_LOGIN)
        .switchMap((actionObject) =>
            Observable.timer(1000)
                .switchMap(() =>
                    this.quesService.userLogin(actionObject["payload"])
                        .map((resp) => {
                            if (resp.status === 'error') {
                                return new userActions.UserLoginFailed({ message: resp.msg, status: resp.status });
                            } else {
                                return new userActions.UserLoginSuccess(resp.msg);
                            }
                        })
                        .catch((err) => Observable.of({ type: userActions.USER_LOGIN_FAILED, payload: err }))
                )
        );

    @Effect()
    loadQuestion: Observable<any> = this.action
        .ofType(userActions.QUESTION_LOAD)
        .switchMap((actionObject) =>
            Observable.timer(500)
                .switchMap(() => {
                    return this.quesService.loadAllQuestions(actionObject["payload"])
                        .map((allQues) => new userActions.QuestionLoadSuccess(new ResponseMapper().mapAllQuestions(allQues, 0, false)))
                        .catch((err) => Observable.of({ type: userActions.QUESTION_LOAD_FAILED, payload: err }));
                })
        );

    @Effect()
    submitAnswer: Observable<any> = this.action
        .ofType(userActions.TEST_SUBMITTED)
        .switchMap((actionObject) =>
            Observable.timer(800)
                .switchMap(() => {
                    return this.quesService.submitTest(actionObject["payload"])
                        .map((resp) => {
                            if (resp.status === 'error') {
                                return new userActions.TestSubmitFailed({ message: resp.question_set, status: resp.status });
                            } else {
                                return new userActions.TestSubmitSuccess({ message: resp.msg, status: resp.status, result: resp.result });
                            }
                        })
                        .catch((err) => Observable.of({ type: userActions.TEST_SUBMITTED_FAILED, payload: { message: err, status: 'error' } }));
                })
        );


}

