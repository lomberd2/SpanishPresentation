import {AfterViewInit, Component} from '@angular/core';
import {IS_TESTING} from "../main";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public hasUserInteracted = false;
  protected readonly IS_TESTING = IS_TESTING;
}
