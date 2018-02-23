
import { Action } from '@ngrx/store';
import { INCREMENT, DECREMENT } from '../action/actions';

// AppState will store all the data for Application
export interface AppState {
    testName: string;
    testCounter: number;
    questionSets: any[];
}

// Initial State of the Application
export const INIT_STATE: AppState = {
    testName: 'Krishna',
    testCounter: 5,
    questionSets: []
    // allQuest: [],
    // responseBasedQuestUI: []
};

// Root Reducer
export function rootReducer(state: AppState = INIT_STATE, action: Action): AppState {
    console.log('Inside Reducer........');
    console.log(action);
    switch (action.type) {
        case INCREMENT: if (state.testCounter >= 10) {
            return state;
        } else {
            return Object.assign({}, state, {
                testCounter: state.testCounter + 1,
                testName: 'name' + (state.testCounter + 1)
            });
        }

        case DECREMENT: if (state.testCounter <= 0) {
            return state;
        } else {
            return Object.assign({}, state, {
                testCounter: state.testCounter - 1,
                testName: 'name' + (state.testCounter - 1)
            });
        }

        default: return state;
    }
}
