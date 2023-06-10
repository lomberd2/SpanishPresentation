import {AfterViewInit, Component} from '@angular/core';
import {AudioPlayerComponent} from "../../components/audio-player/audio-player.component";
import {Song} from "../../interfaces/song";

@Component({
  selector: 'app-test-beginning',
  templateUrl: './test-beginning.component.html',
  styleUrls: ['./test-beginning.component.css']
})
export class TestBeginningComponent implements AfterViewInit {

  constructor() { }

  ngAfterViewInit() {
    AudioPlayerComponent.setNextSong({
      name: 'Sigue',
      artist: 'J Balvin & Ed Sheeran',
      url_origin: 'https://www.youtube.com/watch?v=8pIzxS_G8-g',
      src: 'assets/audio/Sigue.mp3'
    } as Song);

    AudioPlayerComponent.show();
  }

}
