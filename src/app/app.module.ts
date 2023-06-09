import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { DisclaimerComponent } from './components/disclaimer/disclaimer.component';
import { JourneyBeginningComponent } from './journey/journey-beginning/journey-beginning.component';
import { AudioPlayerComponent } from './components/audio-player/audio-player.component';
import { MultipleChoiceComponent } from './components/multiple-choice/multiple-choice.component';
import { UserInformationComponent } from './components/user-information/user-information.component';
import { UserManagerService } from "./services/user-manager.service";
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    DisclaimerComponent,
    JourneyBeginningComponent,
    AudioPlayerComponent,
    MultipleChoiceComponent,
    UserInformationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [UserManagerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
