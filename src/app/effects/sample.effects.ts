import { Effect, Actions } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';

import 'rxjs/add/operator/do';
import 'rxjs/add/operator/mergeMap';

// import { INCREMENT, DECREMENT, INCREMENT_FROM_EFFECT, DECREMENT_FROM_EFFECT } from '../action/actions';

@Injectable()
export class SampleEffects {

    constructor(private action: Actions) {
        console.log('Inside Effects===>>');
    }

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
