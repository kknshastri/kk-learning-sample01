// export enum AnswerType {
//     Single = 'SingleAnswer',
//     Multiple = 'MultipleAnswer',
//     Text = 'TextAnswer'
// }

export interface Question {
    quesId: string;
    title: string;
    description?: string;
    answerType: string;
    answerOptions: any[];
    answerResponse: any | any[];
    // answer : Question
}
