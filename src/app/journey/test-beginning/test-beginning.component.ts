import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {AudioPlayerComponent} from "../../components/audio-player/audio-player.component";
import {Song} from "../../interfaces/song";
import {UserManagerService} from "../../services/user-manager.service";
import {Router} from "@angular/router";
import {IMultiQuestion} from "../../interfaces/i-multi-question";
import {MultipleChoiceComponent} from "../../components/multiple-choice/multiple-choice.component";
import {Observable} from "rxjs";
import {MultipleEvents} from "../../enums/multiple-events";
import {IMultiEvent} from "../../interfaces/i-multi-event";

@Component({
  selector: 'app-test-beginning',
  templateUrl: './test-beginning.component.html',
  styleUrls: ['./test-beginning.component.css']
})
export class TestBeginningComponent implements AfterViewInit {

  private currentQuestionIndex: number = 0;

  @ViewChild("multipleChoiceComponent")
  public multipleChoiceComponent: MultipleChoiceComponent | undefined;

  constructor(private userManager: UserManagerService, private router: Router) { }

  ngAfterViewInit() {
    AudioPlayerComponent.setNextSong({
      name: 'Sigue',
      artist: 'J Balvin & Ed Sheeran',
      url_origin: 'https://www.youtube.com/watch?v=8pIzxS_G8-g',
      src: 'assets/audio/Sigue.mp3'
    } as Song);

    AudioPlayerComponent.show();

    this.nextQuestion();

    this.eventListener();
  }

  public nextQuestion() {
    // Check if next question exists
    if (this.currentQuestionIndex < tests.length) {
      // Get next question
      const nextQuestion = tests[this.currentQuestionIndex];
      // Increment current question index
      this.currentQuestionIndex++;
      // Set next question
      this.multipleChoiceComponent?.setNextQuestion(nextQuestion);
    }
  }

  public eventListener() {
    this.multipleChoiceComponent?.eventEmitter.subscribe((event: IMultiEvent) => {
      let AlertMessage: string = "";
      switch (event.EventType) {
        case MultipleEvents.CORRECT_ANSWER: {
          AlertMessage = `Correct! You have reached the maximum score of ${event.EventData.MaxReachableScore} points!`;
          break;
        }
        case MultipleEvents.COMPLETELY_WRONG_ANSWER: {
          AlertMessage = `Wrong! You have reached the minimum score of ${event.EventData.MinReachableScore} points!\nCorrect answers: \n● ${event.EventData.CorrectAnswers.join("\n● ")}`;
          break;
        }
        case MultipleEvents.SOME_WRONG_ANSWER: {
          AlertMessage = `Wrong! You have reached ${event.EventData.ReachedScore} points out of ${event.EventData.MaxReachableScore}!\nCorrect answers:\n● ${event.EventData.CorrectAnswers.join("\n● ")}`;
          break;
        }
      }

      alert(AlertMessage);
    });
  }

}

const tests: IMultiQuestion[] = [
  {
    title: "Pregunta nº 1",
    question: "¿Cómo se llama la canción?",
    answers: ["Sigué", "Sigue", "Sigüe", "Sigüé"],
    correctAnswers: ["Sigue"],
    points: {
      correct: 1,
      wrong: 2
    }
  }
] as IMultiQuestion[];
