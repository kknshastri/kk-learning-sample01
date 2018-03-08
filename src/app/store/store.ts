
// import { Action } from '@ngrx/store';
import * as userActions from '../action/user-actions';
import * as adminActions from '../action/admin-actions';


import { Question } from '../model/question.model';
import { Section } from '../model/section.model';
import { Questionnaire } from '../model/questionnaire.model';

import { ResponseMapper } from '../effects/response.mapper';
import { USER_LOGIN_FAILED } from '../action/user-actions';


export interface AllQuestions {
    isLoading: boolean;
    data: any;
    error: any;
}
export interface LoggedUser {
    userId?: string;
    role: string;
    name: string;
    firstName: string;
    lastName: string;
    email?: string;
    isLoginProgress: boolean;
    isValidUser: boolean;
    error: any;
}
export interface UserStates {
    questionnaireSet: string;
    testStatus: string;
    timerStarted: boolean;
    title?: string;
    isTestInProgress?: boolean;
    isTestSubmitted?: boolean;
    selectedSection?: any;
    currentQuestion?: any;
    currentSectionCounter: number;
    currentQuesCounter: number;
    allQuestions: AllQuestions;
    nextPointer?: boolean;
    prevPointer?: boolean;
}
export interface AdminStates {
    selectedSidebarMenu: string;
    manageQuestions: Question[];
    manageSections: Section[];
    manageQuestionnaire: Questionnaire[];
}

// AppState will store all the data for Application
export interface AppState {
    testName: string;
    testCounter: number;
    loggedInUser: LoggedUser;
    adminStates: AdminStates;
    userStates: UserStates;
}

// Initial State of the Application
export const INIT_STATE: AppState = {
    testName: 'Krishna Kant Narayan Shastri',
    testCounter: 5,
    loggedInUser: {
        userId: '',
        role: 'user',
        name: 'Krishna Kant - User',
        firstName: '',
        lastName: '',
        email: '',
        isLoginProgress: false,
        isValidUser: false,
        error: null,
    },
    adminStates: {
        selectedSidebarMenu: 'Questions',
        manageQuestions: [],
        manageSections: [],
        manageQuestionnaire: []
    },
    userStates: {
        questionnaireSet: '',
        testStatus: 'notstarted',
        timerStarted: false,
        isTestInProgress: false,
        isTestSubmitted: false,
        currentQuesCounter: 0,
        currentSectionCounter: 0,
        selectedSection: null,
        currentQuestion: null,
        allQuestions: {
            isLoading: false,
            data: null,
            error: null
        },
        nextPointer: true,
        prevPointer: false
    }
};


// Root Reducer
export function rootReducer(state: AppState = INIT_STATE, action): AppState {
    console.log('Action >>>>');
    console.log(action);
    switch (action.type) {
        // All Admin Actions here...
        case adminActions.SIDEMENU_SELECTED: return Object.assign({}, state, {
            adminStates: Object.assign({}, state.adminStates, {
                selectedSidebarMenu: action.payload
            })
        });


        // All User Actions here...

        case userActions.USER_LOGIN: return Object.assign({}, state, {
            loggedInUser: Object.assign({}, state.loggedInUser, {
                isLoginProgress: true,
                isValidUser: false,
                error: null
            })
        });

        case userActions.USER_LOGIN_SUCCESS: return Object.assign({}, state, {
            loggedInUser: Object.assign({}, state.loggedInUser, {
                isLoginProgress: false,
                isValidUser: true,
                error: null,
                userId: action.payload.msg._id,
                role: action.payload.msg.user_role,
                name: action.payload.msg.first_name + ' ' + action.payload.msg.last_name,
                firstName: action.payload.msg.first_name,
                lastName: action.payload.msg.last_name,
                email: action.payload.msg.email
            }),
            userStates: Object.assign({}, state.userStates, {
                questionnaireSet: action.payload.msg.questionset_id,
                testStatus: action.payload.msg.test_status
            })
        });

        case userActions.USER_LOGIN_FAILED: return Object.assign({}, state, {
            loggedInUser: Object.assign({}, state.loggedInUser, {
                isLoginProgress: false,
                isValidUser: false,
                error: action.payload.message
            }),
            userStates: Object.assign({}, state.userStates, {
                questionnaireSet: '',
                testStatus: ''
            })
        });


        case userActions.QUESTION_LOAD: return Object.assign({}, state, {
            userStates: Object.assign({}, state.userStates, {
                allQuestions: Object.assign({}, {
                    isLoading: true,
                    data: null,
                    error: null
                })
            })
        });

        case userActions.QUESTION_LOAD_SUCCESS: return Object.assign({}, state, {
            userStates: Object.assign({}, state.userStates, {
                allQuestions: Object.assign({}, {
                    isLoading: false,
                    data: action.payload,
                    error: null
                }),
                selectedSection: action.payload.question_set.sections_questions[0],
                currentQuestion: action.payload.question_set.sections_questions[0].questions[0]
            })
        });

        case userActions.QUESTION_LOAD_FAILED: return Object.assign({}, state, {
            userStates: Object.assign({}, state.userStates, {
                allQuestions: Object.assign({}, {
                    isLoading: false,
                    data: null,
                    error: action.payload
                })
            })
        });


        case userActions.TEST_PROGRESS: return Object.assign({}, state, {
            userStates: Object.assign({}, state.userStates, { isTestInProgress: action.payload })
        });

        case userActions.TIMER_START_FLAG: return Object.assign({}, state, {
            userStates: Object.assign({}, state.userStates, { timerStarted: true })
        });

        case userActions.TEST_SELECTED_SECTION: return Object.assign({}, state, {
            userStates: Object.assign({}, state.userStates, {
                selectedSection: action.payload[0],
                currentQuestion: action.payload[0].questions[0],
                currentSectionCounter: action.payload[1],
                currentQuesCounter: 0,
                allQuestions: Object.assign({}, state.userStates.allQuestions, {
                    data: new ResponseMapper().mapAllQuestions(state.userStates.allQuestions.data, action.payload[1], true)
                })
            })
        });

        case userActions.TEST_SELECTED_QUESTION: return Object.assign({}, state, {
            userStates: Object.assign({}, state.userStates, {
                currentQuestion: action.payload[0],
                currentQuesCounter: action.payload[1]
            })
        });

        case userActions.SAVE_CURR_ANSWER: return Object.assign({}, state, {
            userStates: Object.assign({}, state.userStates, {
                currentQuestion: Object.assign({}, state.userStates.currentQuestion, {
                    isAnswered: action.payload.length ? true : false,
                    answer: Object.assign({}, state.userStates.currentQuestion.answer, {
                        answer_value: action.payload
                    })
                }),
                allQuestions: Object.assign({}, state.userStates.allQuestions, {
                    data: new ResponseMapper().updateAnswer(state.userStates.allQuestions.data, state.userStates.currentSectionCounter,
                        state.userStates.currentQuesCounter, action.payload)
                })
            })
        });

        case userActions.NAVIGATE_QUES:
            let prevPtr = false, nextPtr = false;
            let newQuesCounter = state.userStates.currentQuesCounter;
            let newSecCounter = state.userStates.currentSectionCounter;

            // NEXT QUESTION: Update pointer on click of NEXT
            if (action.payload === 'next') {
                // Next section exist
                if (newSecCounter < (state.userStates.allQuestions.data.question_set.sections_questions.length - 1)) {
                    // Same section next question
                    if (newQuesCounter < (state.userStates.selectedSection.questions.length - 1)) {
                        newQuesCounter += 1;
                        prevPtr = true;
                        nextPtr = true;     // VERIFY TODO...
                    } else {
                        newQuesCounter = 0;
                        newSecCounter += 1;
                        prevPtr = true;
                        nextPtr = true;
                    }
                } else {    // Next section doesn't exist
                    // Same section next question
                    if (newQuesCounter < (state.userStates.selectedSection.questions.length - 2)) {
                        newQuesCounter += 1;
                        prevPtr = true;
                        nextPtr = true;
                    } else {
                        newQuesCounter += 1;
                        prevPtr = true;
                        nextPtr = false;
                    }
                }

            } else {        // PREVIOUS QUESTION: Update pointer on click of PREVIOUS
                // Check if prev question is available in same section and there should be prev section..
                if (newSecCounter > 0) {
                    if (newQuesCounter > 0) {    // Same section prev question...
                        newQuesCounter -= 1;
                        prevPtr = true;
                        nextPtr = true;
                    } else {
                        newSecCounter -= 1;     // Prev section last question...
                        newQuesCounter = state.userStates.allQuestions.data.question_set.sections_questions[newSecCounter].questions.length - 2;
                        nextPtr = true;
                        prevPtr = ((newSecCounter >= 0) && (newQuesCounter > 0)) ? true : false;
                    }
                } else {
                    // Check for first section...
                    if (newQuesCounter > 0) {
                        newQuesCounter -= 1;
                        nextPtr = true;
                        prevPtr = (newQuesCounter > 0) ? true : false;
                    } else {

                    }
                }
            }

            return Object.assign({}, state, {
                userStates: Object.assign({}, state.userStates, {
                    nextPointer: nextPtr,
                    prevPointer: prevPtr,
                    currentSectionCounter: newSecCounter,
                    currentQuesCounter: newQuesCounter
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





        default: return state;
    }
}

