import {AfterViewInit, Component, EventEmitter, Input, Output} from '@angular/core';
import {IMultiQuestion} from "../../interfaces/i-multi-question";
import {IMultiEvent} from "../../interfaces/i-multi-event";
import {MultipleEvents} from "../../enums/multiple-events";

@Component({
  selector: 'app-multiple-choice',
  templateUrl: './multiple-choice.component.html',
  styleUrls: ['./multiple-choice.component.css']
})
export class MultipleChoiceComponent implements AfterViewInit {

  @Output()
  public eventEmitter: EventEmitter<IMultiEvent> = new EventEmitter<IMultiEvent>();

  @Input()
  public multiQuestion: IMultiQuestion = {
    title: "Question Title",
    question: "What is the question?",
    answers: ["Answer 1", "Answer 2", "Answer 3", "Answer 4"],
    correctAnswers: ["Answer 1", "Answer 2"],
    points: {
      correct: 1,
      wrong: 1
    }
  }

  public question: string = this.multiQuestion.question;
  public answers: string[] = this.multiQuestion.answers;
  public correctAnswers: string[] = this.multiQuestion.correctAnswers;

  public selected: string[] = [];

  protected maxReachableScore: number = this.multiQuestion.points.correct * this.multiQuestion.correctAnswers.length;
  protected minReachableScore: number = this.multiQuestion.points.wrong * (this.multiQuestion.answers.length - this.multiQuestion.correctAnswers.length);

  constructor() { }

  ngAfterViewInit() {
    //@ts-ignore
    $('.ui.dropdown').dropdown({
      clearable: true,
      useLabels: false,
      maxSelections: 4
    });
  }

  protected getScore(): number {
    let score: number = 0;
    for (let answer of this.selected) {
      if (this.correctAnswers.includes(answer)) {
        score += this.multiQuestion.points.correct;
      } else {
        score -= this.multiQuestion.points.wrong;
      }
    }
    return score;
  }

  protected checkIsAnswerCorrect(): boolean {
    return this.getScore() === this.maxReachableScore;
  }

  protected checkIsAnswerCompletelyWrong(): boolean {
    return this.getScore() === this.minReachableScore;
  }

  public continue() {
    let eventResult: IMultiEvent = {
      EventType: MultipleEvents.NO_ANSWER,
      EventData: {
        Question: this.question,
        CorrectAnswers: this.correctAnswers,
        Answers: this.answers,
        GivenAnswers: this.selected,
        ReachedScore: this.getScore()
      }
    } as IMultiEvent;

    if (this.checkIsAnswerCorrect()) {
      eventResult.EventType = MultipleEvents.CORRECT_ANSWER;
    }else if (this.checkIsAnswerCompletelyWrong()) {
      eventResult.EventType = MultipleEvents.COMPLETELY_WRONG_ANSWER;
    } else if (this.selected.length > 0) {
      eventResult.EventType = MultipleEvents.SOME_WRONG_ANSWER;
    } else {
      eventResult.EventType = MultipleEvents.NO_ANSWER;
    }


    this.eventEmitter.emit(eventResult);
  }
}
