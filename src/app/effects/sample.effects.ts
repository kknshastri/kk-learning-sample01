import { Effect, Actions } from '@ngrx/effects';
import { Injectable } from '@angular/core';

import { QuestionService } from '../services/question.service';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';

import 'rxjs/add/operator/do';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
// import { map } from 'rxjs/operators';

import * as userActions from '../action/user-actions';
import * as adminActions from '../action/admin-actions';


@Injectable()
export class SampleEffects {

    constructor(private action: Actions, private store: Store<any>, private quesService: QuestionService) {
        console.log('Inside Effects===>>');
    }

    @Effect()
    loadQuestion: Observable<any> = this.action
        .ofType(userActions.QUESTION_LOAD)
        .switchMap(() => {
            console.log('Inside Effect: loadQuestion, service call');
            // return Observable.of({ type: userActions.QUESTION_LOAD_SUCCESS, payload: [null, false] });
            return this.quesService.loadAllQuestions()
                .map((allQues) => Observable.of({ type: userActions.QUESTION_LOAD_SUCCESS }))
                .catch((err) => Observable.of({ type: userActions.QUESTION_LOAD_FAILED }));

        });

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
