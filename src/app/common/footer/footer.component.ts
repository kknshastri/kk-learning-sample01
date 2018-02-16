import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { QuestionService } from '../../services/question.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor(public questService: QuestionService) {
  }

  ngOnInit() {
  }

  // @Output()
  // loadNextQuestions: EventEmitter<void> = new EventEmitter<void>();

  loadNext() {
    console.log('Loading next...');
    // this.loadNextQuestions.emit(null);
    this.questService.updateLoadNext();
  }



}
