import { MultipleEvents } from "../enums/multiple-events";

export interface IMultiEvent {
  EventType: MultipleEvents;
  EventData: {
    Question: string;
    Answers: string[];
    CorrectAnswers: string[];
    GivenAnswers: string[];
    ReachedScore: number;
  }
}
