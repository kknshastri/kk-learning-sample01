// export enum AnswerType {
//     Single = 'SingleAnswer',
//     Multiple = 'MultipleAnswer',
//     Text = 'TextAnswer'
// }

export class Question {
    quesId: string;
    title: string;
    description: string;
    answerType: string;
    answerOptions: any[];
    answerResponse: any | any[];
}
