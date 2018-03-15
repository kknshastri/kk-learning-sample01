import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as endpoints from '../helper/http.endpoints';

import { Observable } from 'rxjs/Observable';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class QuestionService {
	constructor(private http: HttpClient) { }

	// Common Headers configuration here

	// Generic HTTP GET REQUEST
	getRequest(url: string): Observable<any> {
		return this.http.get(url)
			.pipe(map((resp) => resp), catchError(this.handleError));
	}
	// Generic HTTP POST REQUEST with optional header
	postRequest(url: string, payload: any, header?: any): Observable<any> {
		return this.http.post(url, payload, header)
			.pipe(map((resp) => resp), catchError(this.handleError));
	}
	// Handle Error
	private handleError(error: any): Promise<any> {
		console.error('An error occurred', error);
		return Promise.reject(error.message || error);
	}


	// Service Call for User Login
	userLogin(req): Observable<any> { return this.postRequest(endpoints.loginApi, req); }
	// Service Call for Load Questionsets
	loadAllQuestions(req): Observable<any> { return this.postRequest(endpoints.loadQuestionApi, req); }
	// Service Call for Test Submission
	submitTest(req): Observable<any> { return this.postRequest(endpoints.submitTestApi, req); }


}

