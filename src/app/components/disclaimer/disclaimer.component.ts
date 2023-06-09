import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {AudioPlayerComponent} from "../audio-player/audio-player.component";

@Component({
  selector: 'app-disclaimer',
  templateUrl: './disclaimer.component.html',
  styleUrls: ['./disclaimer.component.css']
})
export class DisclaimerComponent {

  constructor(public router: Router) {
  }

  public continue() {
    // Navigate to the next page [landing-page]
    AudioPlayerComponent.pause();
    AudioPlayerComponent.hide();
    this.router.navigate(['/beginning']);
  }
}
