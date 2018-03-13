import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as endpoints from '../helper/http.endpoints';

import { Observable } from 'rxjs/Observable';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class QuestionService {
	constructor(private http: HttpClient) { }

	// HTTP Call for User Login
	userLogin(req): Observable<any> {
		console.log('payload before service call', req);
		return this.http.post(endpoints.loginApi, req)
			.pipe(map((resp) => resp), catchError(this.handleError));
	}

	// HTTP Call for Load Questionsets
	loadAllQuestions(req): Observable<any> {
		return this.http.post(endpoints.loadQuestionApi, req)
			.pipe(map((resp) => resp), catchError(this.handleError));
	}

	// HTTP Call for Test Submission
	submitTest(req): Observable<any> {
		return this.http.post(endpoints.submitTestApi, req)
			.pipe(map((resp) => resp), catchError(this.handleError));
	}



	// Handle Error
	private handleError(error: any): Promise<any> {
		console.error('An error occurred', error);
		return Promise.reject(error.message || error);
	}
}

