import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class QuestionService {

  private questionApiUrl = 'http://localhost:5000/api/questionset/3';
  private loginApiUrl = 'http://localhost:5000/api/login';

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
      .pipe(
      map((resp) => {
        // console.log('Inside map of user login response ----');
        // console.log(resp);
        return resp;
      }),
      catchError(this.handleError)
      );
  }

  loadAllQuestions(): Observable<any> {
    // console.log('Calling service loadAllQuestions ===>>>');
    return this.http.get(this.questionApiUrl)
      .pipe(
      map((resp) => {
        // Response Mapper here: <TODO>
        return resp;
      }),
      catchError(this.handleError)
      );
  }



  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }


}
