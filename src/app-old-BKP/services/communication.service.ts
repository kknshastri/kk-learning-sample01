import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class CommunicationService {

  constructor(private http: HttpClient) { }


  post(url, data): Observable<any> {
    return this.http.post(url, data)
      .pipe(map((resp) => resp), catchError(this.handleError));
  }

  // Handle Error
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
  // get(req): Observable<any> {
  // 	console.log('payload before service call', req);
  // 	return this.http.post(endpoints.loginApi, req)
  // 		.pipe(map((resp) => resp), catchError(this.handleError));

}
