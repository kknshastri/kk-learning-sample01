
// import { Action } from '@ngrx/store';
import * as userActions from '../action/user-actions';
import * as adminActions from '../action/admin-actions';


import { Question } from '../model/question.model';
import { Section } from '../model/section.model';
import { Questionnaire } from '../model/questionnaire.model';

export interface loggedUser {
    userId?: string;
    role: string;
    name: string;
    email?: string;
}
export interface userStates {
    timerStarted: boolean
    title?: string;
    isTestInProgress?: boolean;
    isTestSubmitted?: boolean;
    selectedSection?: any;
    currentQuestion?: any;
    currentSectionCounter: number;
    currentQuesCounter: number;
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
export const INIT_STATE: AppState = {
    testName: 'Krishna Kant Narayan Shastri',
    testCounter: 5,
    loggedInUser: {
        role: 'user',
        name: 'Krishna Kant - User',
        userId: 'USER008',
    },
    adminStates: {
        selectedSidebarMenu: 'Questions',
        manageQuestions: [],
        manageSections: [],
        manageQuestionnaire: []
    },
    userStates: {
        timerStarted: false,
        isTestInProgress: false,
        isTestSubmitted: false,
        currentQuesCounter: 0,
        currentSectionCounter: 0,
        selectedSection: {
            sectionName: 'Section One',
            sectionExpanded: false,
            questions: [
                {
                    qid: '1',
                    isAnswered: true,
                    description: 'What are the modules in SAP? Select correct answers from below.'
                }
            ]
        },
        currentQuestion: {
            qid: '1',
            isAnswered: true,
            description: 'What are the modules in SAP? Select correct answers from below.'
        }
    }
};



// Root Reducer
export function rootReducer(state: AppState = INIT_STATE, action): AppState {
    console.log('Action >>>>');
    console.log(action);
    switch (action.type) {
        // All Admin Actions here...
        case adminActions.SIDEMENU_SELECTED: return Object.assign({}, state, {
            adminStates: { selectedSidebarMenu: action.payload }
        });




        // All User Actions here...
        case userActions.QUESTION_LOAD: console.log('Reducer: Question Loading...');
            return Object.assign({}, state);

        case userActions.QUESTION_LOAD_SUCCESS: console.log('Reducer: QUESTION_LOAD_SUCCESS');
            return Object.assign({}, state);

        case userActions.QUESTION_LOAD_FAILED: console.log('Reducer: QUESTION_LOAD_FAILED');
            return Object.assign({}, state);


        case userActions.TEST_PROGRESS: return Object.assign({}, state, {
            userStates: Object.assign({}, state.userStates, { isTestInProgress: action.payload })
        });

        case userActions.TIMER_START_FLAG: return Object.assign({}, state, {
            userStates: Object.assign({}, state.userStates, { timerStarted: true })
        });

        case userActions.TEST_SELECTED_SECTION: return Object.assign({}, state, {
            userStates: Object.assign({}, state.userStates, {
                selectedSection: action.payload[0],
                currentSectionCounter: action.payload[1]
            })
        });

        case userActions.TEST_SELECTED_QUESTION: return Object.assign({}, state, {
            userStates: Object.assign({}, state.userStates, {
                currentQuestion: action.payload[0],
                currentQuesCounter: action.payload[1]
            })
        });

        case userActions.TEST_SUBMITTED: return Object.assign({}, state, {
            userStates: Object.assign({}, state.userStates, {
                isTestInProgress: false,
                isTestSubmitted: action.payload
            })
        });

        // case userActions.SHOW_PREV_QUES: return Object.assign({}, state, {
        //     userStates: Object.assign({}, state.userStates, { currentQuesCounter: state.userStates.currentQuesCounter - 1 })
        // });

        // case userActions.SHOW_NEXT_QUES: return Object.assign({}, state, {
        //     userStates: Object.assign({}, state.userStates, { currentQuesCounter: state.userStates.currentQuesCounter + 1 })
        // });

        case userActions.SHOW_PREV_QUES: return Object.assign({}, state, {
            userStates: Object.assign({}, state.userStates, {})
        });

        case userActions.SHOW_NEXT_QUES: return Object.assign({}, state, {
            userStates: Object.assign({}, state.userStates, {})
        });

        case userActions.SAVE_CURR_QUES: return Object.assign({}, state);




        default: return state;
    }
}
