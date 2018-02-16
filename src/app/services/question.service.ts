import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class QuestionService {

  private stepCount: number = 5;
  private startIndex: number;

  constructor(){
    this.startIndex = 0;
  }

  updateLoadNext(): void {
    console.log('Updating index in service...');
    this.startIndex += this.stepCount;
    console.log('New Value = ' + this.startIndex);
  }

  getStartIndex(): number {
    return this.startIndex;
  }


}
