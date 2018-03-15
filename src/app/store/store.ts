import { Helper } from '../helper/helper';
// import { Action } from '@ngrx/store';
import * as userActions from '../action/user-actions';
import * as adminActions from '../action/admin-actions';

import { Question } from '../model/question.model';
import { Section } from '../model/section.model';
import { Questionnaire } from '../model/questionnaire.model';
import { ResponseMapper } from '../effects/response.mapper';

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
	isTestSubmitProgress: boolean;
	testSubmitError: any;
	testSubmitResult: any;
	selectedSection?: any;
	currentQuestion?: any;
	currentSectionCounter: number;
	currentQuesCounter: number;
	allQuestions: AllQuestions;
	prevPointer?: boolean;
	nextPointer?: boolean;
	testDuration: number;
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
		testStatus: '',
		timerStarted: false,
		isTestInProgress: false,
		isTestSubmitted: false,
		isTestSubmitProgress: false,
		testSubmitError: null,
		testSubmitResult: null,
		currentQuesCounter: 0,
		currentSectionCounter: 0,
		selectedSection: null,
		currentQuestion: null,
		allQuestions: { isLoading: false, data: null, error: null },
		prevPointer: false,
		nextPointer: false,
		testDuration: 0
	}
};


// Root Reducer
export function rootReducer(state: AppState = INIT_STATE, action): AppState {
	console.log('Received Action ---->>>>', action);
	const helper = new Helper();
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
				userId: action.payload._id,
				role: action.payload.user_role,
				name: action.payload.first_name + ' ' + action.payload.last_name,
				firstName: action.payload.first_name,
				lastName: action.payload.last_name,
				email: action.payload.email
			}),
			userStates: Object.assign({}, state.userStates, {
				questionnaireSet: action.payload.questionset_id,
				testStatus: action.payload.test_status,
				isTestSubmitted: (action.payload.test_status === 'completed' ? true : false)
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
				currentQuestion: action.payload.question_set.sections_questions[0].questions[0],
				testStatus: 'started',
				testDuration: action.payload.question_set.duration,
				nextPointer: ((action.payload.question_set.sections_questions.length === 1) &&
					(action.payload.question_set.sections_questions[0].questions.length === 1)) ? false : true
			})
		});

		case userActions.QUESTION_LOAD_FAILED: return Object.assign({}, state, {
			userStates: Object.assign({}, state.userStates, {
				allQuestions: Object.assign({}, {
					isLoading: false,
					data: null,
					error: action.payload
				}),
				testStatus: 'notstarted'
			})
		});

		case userActions.TEST_PROGRESS: return Object.assign({}, state, {
			userStates: Object.assign({}, state.userStates, { isTestInProgress: action.payload })
		});

		case userActions.TIMER_START_FLAG: return Object.assign({}, state, {
			userStates: Object.assign({}, state.userStates, { timerStarted: true })
		});

		case userActions.TEST_SELECTED_SECTION:
			const jumpCounter1 = helper.jumpCounter(state.userStates, 0, action.payload[1]);
			return Object.assign({}, state, {
				userStates: Object.assign({}, state.userStates, {
					selectedSection: action.payload[0],
					currentQuestion: action.payload[0].questions[0],
					currentSectionCounter: action.payload[1],
					currentQuesCounter: 0,
					allQuestions: Object.assign({}, state.userStates.allQuestions, {
						data: new ResponseMapper().mapAllQuestions(state.userStates.allQuestions.data, action.payload[1], true)
					}),
					nextPointer: jumpCounter1.nextPtr,
					prevPointer: jumpCounter1.prevPtr
				})
			});

		case userActions.TEST_SELECTED_QUESTION:
			const jumpCounter2 = helper.jumpCounter(state.userStates, action.payload[1], state.userStates.currentSectionCounter);
			return Object.assign({}, state, {
				userStates: Object.assign({}, state.userStates, {
					currentQuestion: action.payload[0],
					currentQuesCounter: action.payload[1],
					nextPointer: jumpCounter2.nextPtr,
					prevPointer: jumpCounter2.prevPtr
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
			const updateCounter = helper.updateCounter(state.userStates, action.payload);
			const updatedQuestionSet = Object.assign({}, state.userStates.allQuestions, {
				data: new ResponseMapper().mapAllQuestions(state.userStates.allQuestions.data, updateCounter.newSecCounter, false)
			});
			return Object.assign({}, state, {
				userStates: Object.assign({}, state.userStates, {
					nextPointer: updateCounter.nextPtr,
					prevPointer: updateCounter.prevPtr,
					currentSectionCounter: updateCounter.newSecCounter,
					currentQuesCounter: updateCounter.newQuesCounter,
					selectedSection: updatedQuestionSet.data.question_set.sections_questions[updateCounter.newSecCounter],
					currentQuestion: updatedQuestionSet.data.question_set.sections_questions[updateCounter.newSecCounter]
						.questions[updateCounter.newQuesCounter],
					allQuestions: updatedQuestionSet
				})
			});

		case userActions.TEST_SUBMITTED: return Object.assign({}, state, {
			userStates: Object.assign({}, state.userStates, {
				isTestInProgress: false,
				isTestSubmitProgress: true
			})
		});

		case userActions.TEST_SUBMITTED_SUCCESS: return Object.assign({}, state, {
			userStates: Object.assign({}, state.userStates, {
				isTestSubmitProgress: false,
				isTestSubmitted: true,
				testStatus: 'completed',
				testSubmitResult: action.payload.result
			})
		});

		case userActions.TEST_SUBMITTED_FAILED: return Object.assign({}, state, {
			userStates: Object.assign({}, state.userStates, {
				isTestSubmitProgress: false,
				testSubmitError: action.payload,
				testSubmitResult: null,
			})
		});


		default: return state;
	}
}

