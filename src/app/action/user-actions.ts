import { Action } from '@ngrx/store';

export const USER_LOGIN = 'USER_LOGIN';
export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';
export const USER_LOGIN_FAILED = 'USER_LOGIN_FAILED';

export const TEST_PROGRESS = 'TEST_PROGRESS';

export const TEST_SELECTED_SECTION = 'TEST_SELECTED_SECTION';
export const TEST_SELECTED_QUESTION = 'TEST_SELECTED_QUESTION';

export const TEST_SUBMITTED = 'TEST_SUBMITTED';
export const TEST_SUBMITTED_SUCCESS = 'TEST_SUBMITTED_SUCCESS';
export const TEST_SUBMITTED_FAILED = 'TEST_SUBMITTED_FAILED';

export const NAVIGATE_QUES = 'NAVIGATE_QUES';
export const SAVE_CURR_ANSWER = 'SAVE_CURR_ANSWER';

export const TIMER_START_FLAG = 'TIMER_START_FLAG';

export const QUESTION_LOAD = 'QUESTION_LOAD';
export const QUESTION_LOAD_SUCCESS = 'QUESTION_LOAD_SUCCESS';
export const QUESTION_LOAD_FAILED = 'QUESTION_LOAD_FAILED';


export class UserLoginSuccess implements Action {
    readonly type = USER_LOGIN_SUCCESS;
    constructor(public payload: any) { }
}
export class UserLoginFailed implements Action {
    readonly type = USER_LOGIN_FAILED;
    constructor(public payload: any) { }
}
export class QuestionLoadSuccess implements Action {
    readonly type = QUESTION_LOAD_SUCCESS;
    constructor(public payload: any) { }
}
export class TestSubmitSuccess implements Action {
    readonly type = TEST_SUBMITTED_SUCCESS;
    constructor(public payload: any) { }
}
export class TestSubmitFailed implements Action {
    readonly type = TEST_SUBMITTED_FAILED;
    constructor(public payload: any) { }
}
