import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {AudioPlayerComponent} from "../../components/audio-player/audio-player.component";
import {Song} from "../../interfaces/song";
import {UserManagerService} from "../../services/user-manager.service";
import {Router} from "@angular/router";
import {IMultiQuestion} from "../../interfaces/i-multi-question";
import {MultipleChoiceComponent} from "../../components/multiple-choice/multiple-choice.component";
import {MultipleEvents} from "../../enums/multiple-events";
import {IMultiEvent} from "../../interfaces/i-multi-event";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-test-beginning',
  templateUrl: './test-beginning.component.html',
  styleUrls: ['./test-beginning.component.css']
})
export class TestBeginningComponent implements AfterViewInit {

  private currentQuestionIndex: number = 0;

  @ViewChild("multipleChoiceComponent")
  public multipleChoiceComponent: MultipleChoiceComponent | undefined;

  constructor(protected userManager: UserManagerService, private router: Router, private _snackBar: MatSnackBar) { }

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

    this.setPossibleScore();
  }

  protected setPossibleScore() {
    let possibleScore: number = 0;
    let possibleNegativeScore: number = 0;

    for (let i = 0; i < tests.length; i++) {
      let question = tests[i];

      possibleScore += question.points.correct;
      possibleNegativeScore += question.points.wrong;
    }

    this.userManager.setPossiblePoints(possibleScore);
    this.userManager.setPossibleNegativePoints(possibleNegativeScore);
  }

  public nextQuestion() {
    // Reset selected answers
    this.multipleChoiceComponent?.reset();

    // Check if next question exists
    if (this.currentQuestionIndex < tests.length) {
      // Get next question
      const nextQuestion = tests[this.currentQuestionIndex];
      // Increment current question index
      this.currentQuestionIndex++;
      // Set next question
      this.multipleChoiceComponent?.setNextQuestion(nextQuestion);
    } else {
      alert("¡Has terminado el test!");
      // Go to results
      this.router.navigate(["/results"]);
    }
  }

  public eventListener() {
    this.multipleChoiceComponent?.eventEmitter.subscribe((event: IMultiEvent) => {
      let scoreModifier: number = event.EventData.ReachedScore;
      let toastMessage: string = "";

      switch (event.EventType) {
        // Completely correct answer
        case MultipleEvents.CORRECT_ANSWER: {
          toastMessage = `¡Respuesta correcta!\n ¡Has ganado ${scoreModifier} puntos!`;

          break;
        }
        case MultipleEvents.COMPLETELY_WRONG_ANSWER: {
          toastMessage = `¡Respuesta incorrecta!\n ¡Has perdido ${scoreModifier} puntos!`;


          break;
        }
        case MultipleEvents.SOME_WRONG_ANSWER: {
          toastMessage = `¡Respuesta parcialmente correcta!\n ¡Has ganado ${scoreModifier} puntos!`;

          break;
        }
        case MultipleEvents.NO_ANSWER: {
          alert("¡No ha seleccionado ninguna respuesta!\n\nYou have not selected any answer!");
          return;
        }
      }

      this.showAlert(event);

      this.userManager.addScore(scoreModifier);

      this.showToast(toastMessage);
      setTimeout(() => {
        this.nextQuestion();
      }, 500);

      //alert(AlertMessage);
    });
  }

  public showAlert(event: IMultiEvent) {
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
  }

  public showToast(message: string) {
    this._snackBar.open(message, "Cerrar", {
      duration: 5000,
      horizontalPosition: "center",
      verticalPosition: "top",
      panelClass: "snackbarCustom"
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
  },
  {
    title: "Pregunta nº 2",
    question: "¿Cómo se llama el artista?",
    answers: ["J Balvin", "Ed Sheeran", "Snoop Dogg", "Miley Cyrus"],
    correctAnswers: ["J Balvin", "Ed Sheeran"],
    points: {
      correct: 1,
      wrong: 2
    }
  },
  {
    title: "Pregunta nº 3",
    question: "Rellena el hueco con la palabra correcta de la canción<br><br>[Ed] •‒› Que a mí me gusta todo lo que [...] [0:07+]",
    answers: ["haces", "exhibes", "muestras", "enseñas"],
    correctAnswers: ["exhibes"],
    points: {
      correct: 3,
      wrong: 2
    }
  },
  {
    title: "Pregunta nº 4",
    question: "Rellena el hueco con la palabra correcta de la canción<br><br>[Ed] •‒› Baby, tú [...] sigue [0:20+]",
    answers: ["solo", "sola", "sólo", "sóla"],
    correctAnswers: ["solo"],
    points: {
      correct: 3,
      wrong: 2
    }
  },
  {
    title: "Pregunta nº 5",
    question: "Rellena el hueco con la palabra correcta de la canción<br><br>[Ed]&[J] •‒› Tú eres [...] pa mí (yeah) [0:24+]",
    answers: ["solo", "sola", "sólo", "sóla"],
    correctAnswers: ["sola"],
    points: {
      correct: 3,
      wrong: 2
    }
  },
  {
    title: "Pregunta nº 6",
    question: "Rellena el hueco con la palabra correcta de la canción<br><br>[J] •‒› Tu [...] es mi debilidad [0:30+]",
    correctAnswers: ["mentalidad"],
    answers: ["mentálidad", "mentalidad", "mentalidá", "mentálidá"],
    points: {
      correct: 3,
      wrong: 2
    }
  },
  {
    title: "Pregunta nº 7",
    question: "Rellena el hueco con la palabra correcta de la canción<br><br>[J]&[Ed] •‒› [...] noche tú y yo sí nos vamo' a joder [0:38+]",
    correctAnswers: ["Esta"],
    answers: ["Ésta", "Está", "Esta", "Éstá"],
    points: {
      correct: 3,
      wrong: 2
    }
  },
  {
    title: "Pregunta nº 8",
    question: "Rellena el hueco con la palabra correcta de la canción<br><br>[J]&[Ed] •‒› Yo [...] puesto, dime si estás puesta pa beber [0:44+]",
    correctAnswers: ["estoy"],
    answers: ["estóy", "estoy", "estóy", "estóy"],
    points: {
      correct: 3,
      wrong: 2
    }
  },
  {
    title: "Pregunta nº 9",
    question: "Rellena el hueco con la palabra correcta de la canción<br><br>[Ed] •‒› Mami, si me sigues, nos vamos [...] hotel [0:49+]",
    correctAnswers: ["pa'l"],
    answers: ["pa'l", "pal", "pál", "pá'l"],
    points: {
      correct: 5,
      wrong: 2
    }
  },
  {
    title: "Pregunta nº 10",
    question: "Rellena el hueco con la palabra correcta de la canción<br><br>[J] •‒› Tú ere' la [...], pa ti no hay un top ten [0:52+]",
    correctAnswers: ["primera"],
    answers: ["priméra", "primera", "priméra", "priméra"],
    points: {
      correct: 5,
      wrong: 2
    }
  },
  {
    title: "Pregunta nº 11",
    question: "Rellena el hueco con la palabra correcta de la canción<br><br>[Ed] •‒› Tu blanquito [...], rojo [0:59+]",
    correctAnswers: ["pelirrojo"],
    answers: ["pelirrójo", "pelirrojo", "pelirrójo", "pelirrójo"],
    points: {
      correct: 5,
      wrong: 2
    }
  },
  {
    title: "Pregunta nº 12",
    question: "Rellena el hueco con la palabra correcta de la canción<br><br>[Ed] •‒› Ten [...] de mí si te cojo, cojo [1:05+]",
    correctAnswers: ["cuidado"],
    answers: ["cuidádo", "cuidado", "cuidádo", "cuidádo"],
    points: {
      correct: 5,
      wrong: 2
    }
  },
  {
    title: "Pregunta nº 13",
    question: "Rellena el hueco con la palabra correcta de la canción<br><br>[J] •‒› Dime, Tainy, si [...] puestas pa'l perreo [1:33+]",
    correctAnswers: ["están"],
    answers: ["éstán", "están", "estoy", "estóy"],
    points: {
      correct: 3,
      wrong: 1
    }
  },
  {
    title: "Pregunta nº 14",
    question: "Rellena el hueco con la palabra correcta de la canción<br><br>[Ed] •‒› Tú no te [...] lo que tengo pa ti [1:44+]",
    correctAnswers: ["imaginas"],
    answers:  ["imaginas", "imáginas", "imagínas", "ímáginas"],
    points: {
      correct: 3,
      wrong: 1
    }
  },
  {
    title: "Pregunta nº 15",
    question: "Rellena el hueco con la palabra correcta de la canción<br><br>[Ed] •‒› Tu [...] pelirrojo, rojo [1:54+]",
    correctAnswers: ["blanquito"],
    answers: ["blanquíto", "blanquito", "blancito", "blancíto"],
    points: {
      correct: 3,
      wrong: 1
    }
  },
  {
    title: "Pregunta nº 16",
    question: "Rellena el hueco con la palabra correcta de la canción<br><br>[Ed] •‒› Ten cuidado [...] te cojo, cojo [2:00+]",
    correctAnswers: ["de mí si"],
    answers: ["de mí sí", "dé mí si", "de mí si", "dé mí sí"],
    points: {
      correct: 3,
      wrong: 1
    }
  },
  {
    title: "Pregunta nº 17",
    question: "Rellena el hueco con la palabra correcta de la canción<br><br>[Ed]&[J] •‒› Yo puedo [...] los temas [2:13+]",
    correctAnswers: ["tocar"],
    answers: ["tocár", "tocar", "tócar", "tócár"],
    points: {
      correct: 3,
      wrong: 1
    }
  },
  {
    title: "Pregunta nº 18",
    question: "Rellena el hueco con la palabra correcta de la canción<br><br>[Ed]&[J] •‒› Baby, [...] sigue [2:13+]",
    correctAnswers: ["tú solo"],
    answers: ["tú sólo", "tú solo", "tu solo", "tú sóló"],
    points: {
      correct: 5,
      wrong: 2
    }
  },
  {
    title: "Pregunta nº 19",
    question: "Rellena el hueco con la palabra correcta de la canción<br><br>[J?] •‒› Dime, Tainy, [...] puestas pa'l perreo [2:27+]",
    correctAnswers: ["si están"],
    answers: ["si están", "sí están", "si estan", "sí estan"],
    points: {
      correct: 5,
      wrong: 2
    }
  },
  {
    title: "Pregunta nº 20 (Pregunta bonus)",
    question: "¿De qué trataba la letra de la canción?",
    correctAnswers: ["De las relaciones sexuales tanto con una como con varias personas"],
    answers: ["De las relaciones sexuales tanto con una como con varias personas", "Se trataba de amantes de los perros en el texto", "La canción hablaba de los activistas climático", "La canción hablaba de la vida de un perro"],
    points: {
      correct: 10,
      wrong: 5
    }
  }
] as IMultiQuestion[];
