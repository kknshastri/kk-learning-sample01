import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class QuestionService {

  private loginApiUrl = 'http://localhost:5000/api/login';
  private questionApiUrl = 'http://localhost:5000/api/questionset/get';
  private submitTestApiUrl = 'http://localhost:5000/api/submitanswer';

  httpOptions1 = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  // HTTP Call for User Login
  userLogin(req): Observable<any> {
    console.log('payload before service call', req);
    return this.http.post(this.loginApiUrl, req)
      .pipe(map((resp) => resp), catchError(this.handleError));
  }

  // HTTP Call for Load Questionsets
  loadAllQuestions(req): Observable<any> {
    // console.log('Calling service loadAllQuestions ===>>>');
    return this.http.post(this.questionApiUrl, req)
      .pipe(map((resp) => resp), catchError(this.handleError));
  }

  // HTTP Call for Test Submission
  submitTest(req): Observable<any> {
    console.log('Calling service submitTest ---->>>');
    return this.http.post(this.questionApiUrl, req)
      .pipe(map((resp) => resp), catchError(this.handleError));
  }


  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }


}
