import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class QuestionService {

  private questionApiUrl = 'http://localhost:5000/api/questionset/3';

  httpOptions1 = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST,GET,PUT,DELETE'
    })
  };

  constructor(private http: HttpClient) { }

  loadAllQuestions(): Observable<any> {
    console.log('Calling service loadAllQuestions ===>>>');
    return this.http.get(this.questionApiUrl, this.httpOptions1)
      .pipe(
        map((rss) => {
          console.log('Inside map----');
          console.log(rss);
          return rss;
        }),
        catchError(this.handleError)
      );
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }


}
