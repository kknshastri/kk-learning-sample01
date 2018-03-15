export class Helper {
    constructor() { }

    updateCounter(userStates, command): any {
        let prevPtr = false, nextPtr = false;
        let newQuesCounter = userStates.currentQuesCounter;
        let newSecCounter = userStates.currentSectionCounter;

        // NEXT QUESTION: Update pointer on click of NEXT
        if (command === 'next') {
            // Check if next section exist
            prevPtr = true;
            if (newSecCounter < (userStates.allQuestions.data.question_set.sections_questions.length - 1)) {
                // Same section next question
                if (newQuesCounter < (userStates.selectedSection.questions.length - 1)) {
                    newQuesCounter += 1;
                    nextPtr = true;
                } else {    // Next section first question
                    newQuesCounter = 0;
                    newSecCounter += 1;
                    nextPtr = (userStates.allQuestions.data.question_set.sections_questions[newSecCounter].questions.length === 1) ?
                        false : true;
                }
            } else {    // Next section doesn't exist
                newQuesCounter += 1;
                nextPtr = (newQuesCounter < (userStates.selectedSection.questions.length - 1)) ? true : false;
            }
        } else {        // PREVIOUS QUESTION: Update pointer on click of PREVIOUS
            // Check if prev question is available in same section and there should be prev section..
            nextPtr = true;
            if (newSecCounter > 0) {
                if (newQuesCounter > 0) {    // Same section prev question...
                    newQuesCounter -= 1;
                    prevPtr = true;
                } else {
                    newSecCounter -= 1;     // Prev section last question...
                    newQuesCounter = userStates.allQuestions.data.question_set.sections_questions[newSecCounter].questions.length - 1;
                    prevPtr = ((newSecCounter >= 0) && (newQuesCounter > 0)) ? true : false;
                }
            } else {
                if (newQuesCounter > 0) {
                    newQuesCounter -= 1;
                    prevPtr = (newQuesCounter > 0) ? true : false;
                } else {
                    prevPtr = false;
                }
            }
        }
        return {
            prevPtr: prevPtr,
            nextPtr: nextPtr,
            newQuesCounter: newQuesCounter,
            newSecCounter: newSecCounter
        };
    }

    jumpCounter(userStates, newQuesId, newSecId): any {
        let prevPtr = false, nextPtr = false;

        nextPtr = (newSecId === (userStates.allQuestions.data.question_set.sections_questions.length - 1)) ?
            ((newQuesId === userStates.allQuestions.data.question_set.sections_questions[newSecId].questions.length - 1) ? false : true)
            : true;

        if (newSecId <= userStates.currentSectionCounter) {
            prevPtr = (newSecId === 0) ?
                ((newQuesId === 0) ? false : true)
                : true;
        } else {
            prevPtr = true;
        }
        return {
            prevPtr: prevPtr,
            nextPtr: nextPtr
        };
    }




}

