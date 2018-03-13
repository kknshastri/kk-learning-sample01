import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'checkAllAnswered'
})
export class CheckAllAnsweredPipe implements PipeTransform {

	transform(value: any, args?: any): boolean {
		let allAnswered = true;
		if (!!args && args === 'allsections') {
			value.map((sec, secIdx) => {
				sec.questions.map((ques, quesIdx) => {
					allAnswered = allAnswered && ques.isAnswered;
				});
			});
		} else {
			value.questions.map((ques, quesIdx) => {
				allAnswered = allAnswered && ques.isAnswered;
			});
		}
		return allAnswered;
	}

}
