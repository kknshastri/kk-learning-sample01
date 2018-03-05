import { Effect, Actions } from '@ngrx/effects';
import { Injectable } from '@angular/core';

import { QuestionService } from '../services/question.service';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';
import { timer } from 'rxjs/observable/timer';

import 'rxjs/add/operator/do';
import 'rxjs/add/operator/mergeMap';
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
    loadQuestion: Observable<any> = this.action
        .ofType(userActions.QUESTION_LOAD)
        .switchMap(() =>
            this.quesService.loadAllQuestions()
                .map((allQues) => new userActions.QuestionLoadSuccess(new ResponseMapper().mapAllQuestions(allQues, 0, false)))
                .catch((err) => Observable.of({ type: userActions.QUESTION_LOAD_FAILED, payload: err }))
        );










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
