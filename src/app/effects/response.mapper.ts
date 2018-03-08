export class ResponseMapper {
    constructor() {}

    mapAllQuestions(requestData, expandedSecIdx, isToggle): any {
        return Object.assign({}, requestData, {
            'question_set': Object.assign({}, requestData.question_set, {
                'sections_questions': requestData.question_set.sections_questions.map((sec, secIdx) => {
                    return Object.assign({}, sec, {
                        'sectionExpanded': secIdx === expandedSecIdx ? (isToggle ? !sec.sectionExpanded : true) : false,
                        'questions': sec.questions.map((ques, quesIdx) => {
                            return Object.assign({}, ques, {
                                'isAnswered': isToggle ? ques.isAnswered : false
                            });
                        })
                    });
                })
            })
        });
    }

    updateAnswer(allQues, sectionIdx, questionIdx, ansOptions): any {
        return Object.assign({}, allQues, {
            'question_set': Object.assign({}, allQues.question_set, {
                'sections_questions': allQues.question_set.sections_questions.map((sec, secIdx) => {
                    if (secIdx !== sectionIdx) return sec;
                    return Object.assign({}, sec, {
                        'questions': sec.questions.map((ques, quesIdx) => {
                            if (quesIdx !== questionIdx) return ques;
                            return Object.assign({}, ques, {
                                'isAnswered': !!ansOptions.length ? true : false,
                                'answer': Object.assign({}, ques.answer, {
                                    'answer_value': !!ansOptions.length ? ansOptions : []
                                })
                            });
                        })
                    });
                })
            })
        });
    }
}
