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

    constructor(private action: Actions, private store: Store<any>, private quesService: QuestionService) {
        console.log('Inside Effects===>>');
    }

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
        .switchMap(() =>
            Observable.timer(500)
                .switchMap(() => {
                    let param1 = {
                        "questionset_id": "3",
                        "email": "kris",
                        "user_id": "5aa292cce3e853118f4b706b"
                    };
                    return this.quesService.loadAllQuestions(param1)
                        .map((allQues) => {
                            console.log('received qset --->>');
                            console.log(allQues);
                            return new userActions.QuestionLoadSuccess(new ResponseMapper().mapAllQuestions(allQues, 0, false));
                        })
                        .catch((err) => Observable.of({ type: userActions.QUESTION_LOAD_FAILED, payload: err }));
                })
        );

    @Effect()
    submitAnswer: Observable<any> = this.action
        .ofType(userActions.TEST_SUBMITTED)
        .switchMap((actionObject) =>
            Observable.timer(1000)
                .switchMap(() => {
                    const userAnswers = Object.assign({}, actionObject["payload"], {
                        "questionset_id": "3",
                        "email": "kris",
                        "user_id": "5aa292cce3e853118f4b706b"
                    });
                    console.log('submitted answers ---------->>-------------->>-------');
                    console.log(userAnswers);
                    return this.quesService.submitTest(userAnswers)
                        .map((resp) => {
                            if (resp.status === 'error') {
                                console.log('Inside if --->>>, resp == ', resp);
                                return new userActions.TestSubmitFailed({ message: resp.question_set, status: resp.status });
                            } else {
                                console.log('Inside else --->>>, resp == ', resp);
                                return new userActions.TestSubmitSuccess(resp.msg);
                            }
                        })
                        .catch((err) => Observable.of({ type: userActions.TEST_SUBMITTED_FAILED, payload: err }));
                }
                )
        );

    // @Effect()
    // testSubmit: Observable<any> = this.action
    //     .ofType(userActions.TEST_SUBMITTED)
    //     .switchMap(() =>
    //         Observable.timer(300)
    //             .switchMap(() =>
    //                 this.quesService.loadAllQuestions()
    //                     .map((allQues) => new userActions.QuestionLoadSuccess(new ResponseMapper().mapAllQuestions(allQues, 0, false)))
    //                     .catch((err) => Observable.of({ type: userActions.QUESTION_LOAD_FAILED, payload: err }))
    //             )
    //     );










    // Working Copy
    // @Effect()
    // loadQuestion: Observable<any> = this.action
    //     .ofType(userActions.QUESTION_LOAD)
    //     .switchMap(() =>
    //         // console.log('Inside Effect: loadQuestion, service call');
    //         // return Observable.of({ type: userActions.QUESTION_LOAD_SUCCESS, payload: [null, false] });
    //         this.quesService.loadAllQuestions()
    //             .map((allQues) => new userActions.LoadAllQuestion(allQues))
    //             .catch((err) => {
    //                 console.log('Inside catch of effects.....');
    //                 return Observable.of({ type: userActions.QUESTION_LOAD_FAILED, payload: err });
    //             })

    //     );

    // Working BKP
    // @Effect()
    // loadQuestion: Observable<any> = this.action
    //     .ofType(userActions.QUESTION_LOAD)
    //     .switchMap(() => {
    //         console.log('Inside Effect: loadQuestion, service call');
    //         // return Observable.of({ type: userActions.QUESTION_LOAD_SUCCESS, payload: [null, false] });
    //         return this.quesService.loadAllQuestions()
    //             .map((allQues) => Observable.of({ type: userActions.QUESTION_LOAD_SUCCESS }))
    //             .catch((err) => Observable.of({ type: userActions.QUESTION_LOAD_FAILED, payload: err }));

    //     });

    // @Effect({ dispatch: true })
    // krishna: Observable<any> = this.action
    //     .ofType(INCREMENT_FROM_EFFECT)
    //     .switchMap(() => {
    //         console.log('Calling Effects====>>>');  // http
    //         return Observable.of({ type: DECREMENT });
    //     });

    // @Effect({ dispatch: true })
    // krishna2: Observable<any> = this.action
    //     .ofType(DECREMENT_FROM_EFFECT)
    //     .switchMap(() => {
    //         console.log('Calling Effects====>>>');
    //         return Observable.of({ type: INCREMENT });
    //     });

}
