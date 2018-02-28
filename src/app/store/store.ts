
// import { Action } from '@ngrx/store';
import * as actions from '../action/actions';

import { Question } from '../model/question.model';
import { Section } from '../model/section.model';
import { Questionnaire } from '../model/questionnaire.model';
import { $ } from 'protractor';


export interface loggedUser {
    userId?: string;
    role: string;
    name: string;
    email?: string;
    isTestInProgress?: boolean;
    isTestSubmitted?: boolean;
    isSubmitTriggered?: boolean;
}

export interface userStates {
    title: string;
}

export interface adminStates {
    selectedSidebarMenu: string;
    manageQuestions: Question[];
    manageSections: Section[];
    manageQuestionnaire: Questionnaire[];
}


// AppState will store all the data for Application
export interface AppState {
    testName: string;
    testCounter: number;
    loggedInUser: loggedUser;
    adminStates: adminStates;
    userStates: userStates;
}

// Initial State of the Application
export const INIT_STATE: AppState = {       // allQuest: [],    // responseBasedQuestUI: []
    testName: 'Krishna Kant Narayan Shastri',
    testCounter: 5,
    loggedInUser: {
        role: 'user',
        name: 'Krishna Kant - User',
        userId: 'USER008',
        isTestInProgress: false,
        isTestSubmitted: false,
        isSubmitTriggered: false
    },
    adminStates: {
        selectedSidebarMenu: 'Questions',
        manageQuestions: [],
        manageSections: [],
        manageQuestionnaire: []
    },
    userStates: null
};



// Root Reducer
export function rootReducer(state: AppState = INIT_STATE, action): AppState {
    // console.log('Inside Reducer........');
    // console.log(action);
    console.log('State before ===');
    console.log(state);
    switch (action.type) {
        case actions.SIDEMENU_SELECTED: return Object.assign({}, state, {
            adminStates: { selectedSidebarMenu: action.payload }
        });

        case actions.TEST_PROGRESS: return Object.assign({}, state, {
            loggedInUser: Object.assign({}, state.loggedInUser, { isTestInProgress: action.payload })
        });

        case actions.TEST_SUBMIT_TRIGGERED: return Object.assign({}, state, {
            loggedInUser: Object.assign({}, state.loggedInUser, { isSubmitTriggered: action.payload })
        });




        case actions.INCREMENT: if (state.testCounter >= 10) {
            return state;
        } else {
            return Object.assign({}, state, {
                testCounter: state.testCounter + 1,
                testName: 'name' + (state.testCounter + 1)
            });
        }

        case actions.DECREMENT: if (state.testCounter <= 0) {
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
