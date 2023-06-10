export interface IMultiQuestion {
  question: string;
  answers: string[];
  correctAnswers: string[];
  points: {
    //How many points are awarded for each correct answer
    correct: number;
    //How many points are deducted for each wrong answer
    wrong: number;
  }
}
