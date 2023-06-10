import {AfterViewInit, Component} from '@angular/core';
import {AudioPlayerComponent} from "../../components/audio-player/audio-player.component";
import {UserManagerService} from "../../services/user-manager.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements AfterViewInit {
  puntos: any;
  posibles: any;

  constructor(protected userManager: UserManagerService, protected router: Router) { }

  ngAfterViewInit() {
    AudioPlayerComponent.pause();
    AudioPlayerComponent.hide();
  }

  public continue() {

  }
}
