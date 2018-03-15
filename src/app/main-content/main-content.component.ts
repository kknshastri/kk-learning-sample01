import { Component, OnInit } from '@angular/core';
import { Question } from '../model/question.model';
import { QuestionService } from '../services/question.service';

@Component({
	selector: 'app-main-content',
	templateUrl: './main-content.component.html',
	styleUrls: ['./main-content.component.scss']
})
export class MainContentComponent implements OnInit {

	constructor(public questService: QuestionService) {
	}

	stepSize = 5;
	startIndex = 5;
	endIndex: number = this.startIndex + this.stepSize;
	// endIndex: number = 2;

	allQuestions: Question[] = [
		{
			quesId: 'Q001',
			title: 'Which is Capital of India?',
			description: 'Kindly read the below question and mark the correct answer.',
			answerType: 'SingleAnswer',
			answerOptions: ['Karnataka', 'New Delhi', 'Maharashtra', 'Goa'],
			answerResponse: ''
		},
		{
			quesId: 'Q002',
			title: 'Currency of India?',
			description: '',
			answerType: 'SingleAnswer',
			answerOptions: ['Indian Rupees', 'Dollar', 'Euro'],
			answerResponse: ''
		},
		{
			quesId: 'Q003',
			title: 'Which all are browsers',
			description: '',
			answerType: 'MultipleAnswer',
			answerOptions: ['Google Chrome', 'Internet Explorer', 'Safari', 'Windows Media Player'],
			answerResponse: []
		},
		{
			quesId: 'Q004',
			title: 'Explain the basics of Object Oriented Concepts.',
			description: '',
			answerType: 'TextAnswer',
			answerOptions: [],
			answerResponse: ''
		},
		{
			quesId: 'Q005',
			title: 'Which is Capital of India?',
			description: 'Kindly read the below question and mark the correct answer.',
			answerType: 'SingleAnswer',
			answerOptions: ['Karnataka', 'New Delhi', 'Maharashtra', 'Goa'],
			answerResponse: ''
		},
		{
			quesId: 'Q006',
			title: 'Currency of India?',
			description: '',
			answerType: 'SingleAnswer',
			answerOptions: ['Indian Rupees', 'Dollar', 'Euro'],
			answerResponse: ''
		},
		{
			quesId: 'Q007',
			title: 'Which all are browsers',
			description: '',
			answerType: 'MultipleAnswer',
			answerOptions: ['Google Chrome', 'Internet Explorer', 'Safari', 'Windows Media Player'],
			answerResponse: []
		},
		{
			quesId: 'Q008',
			title: 'Explain the basics of Object Oriented Concepts.',
			description: '',
			answerType: 'TextAnswer',
			answerOptions: [],
			answerResponse: ''
		},
		{
			quesId: 'Q009',
			title: 'Currency of India?',
			description: '',
			answerType: 'SingleAnswer',
			answerOptions: ['Indian Rupees', 'Dollar', 'Euro'],
			answerResponse: ''
		},
		{
			quesId: 'Q010',
			title: 'Which all are browsers',
			description: '',
			answerType: 'MultipleAnswer',
			answerOptions: ['Google Chrome', 'Internet Explorer', 'Safari', 'Windows Media Player'],
			answerResponse: []
		}
	];

	ngOnInit() {
	}

	multipleAnswerChange(e, ques) {
		if (!!e.target.checked) {
			ques.answerResponse.push(e.target.value);
		} else {
			const optIndex = ques.answerResponse.indexOf(e.target.value);
			if (optIndex > -1) {
				ques.answerResponse.splice(optIndex, 1);
			}
		}
	}

	singleAnswerChange(e, ques) {
		ques.answerResponse = e.target.value;
	}



}
