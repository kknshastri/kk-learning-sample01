import { Action } from '@ngrx/store';

export const TEST_PROGRESS = 'TEST_PROGRESS';
export const TEST_SUBMITTED = 'TEST_SUBMITTED';
export const TEST_SELECTED_SECTION = 'TEST_SELECTED_SECTION';
export const TEST_SELECTED_QUESTION = 'TEST_SELECTED_QUESTION';

export const SHOW_PREV_QUES = 'SHOW_PREV_QUES';
export const SHOW_NEXT_QUES = 'SHOW_NEXT_QUES';
export const SAVE_CURR_QUES = 'SAVE_CURR_QUES';

export const TIMER_START_FLAG = 'TIMER_START_FLAG';

export const QUESTION_LOAD = 'QUESTION_LOAD';
export const QUESTION_LOAD_SUCCESS = 'QUESTION_LOAD_SUCCESS';
export const QUESTION_LOAD_FAILED = 'QUESTION_LOAD_FAILED';


export class QuestionLoadSuccess implements Action {
    readonly type = QUESTION_LOAD_SUCCESS;
    constructor(public payload: any) { }
}
