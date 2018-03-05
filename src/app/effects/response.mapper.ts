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
                                'isAnswered': false
                            });
                        })
                    });
                })
            })
        });
    }
}
