import {AfterViewInit, Component} from '@angular/core';
import {AudioPlayerComponent} from "../../components/audio-player/audio-player.component";

@Component({
  selector: 'app-journey-beginning',
  templateUrl: './journey-beginning.component.html',
  styleUrls: ['./journey-beginning.component.css']
})
export class JourneyBeginningComponent implements AfterViewInit{

  constructor() { }

  ngAfterViewInit() {
    AudioPlayerComponent.pause();
    AudioPlayerComponent.hide();
  }

  public continue() {

  }
}
