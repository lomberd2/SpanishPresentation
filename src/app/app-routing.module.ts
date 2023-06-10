import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LandingPageComponent} from "./components/landing-page/landing-page.component";
import {DisclaimerComponent} from "./components/disclaimer/disclaimer.component";
import {JourneyBeginningComponent} from "./journey/journey-beginning/journey-beginning.component";
import {isLoggedInGuard} from "./guards/is-logged-in.guard";
import {MultipleChoiceComponent} from "./components/multiple-choice/multiple-choice.component";
import {TestBeginningComponent} from "./journey/test-beginning/test-beginning.component";

const routes: Routes = [
  { path: "", component: LandingPageComponent },
  { path: "disclaimer", component: DisclaimerComponent, canActivate: [isLoggedInGuard] },
  { path: "beginning", component: JourneyBeginningComponent, canActivate: [isLoggedInGuard] },
  { path: "testBeginning", component: TestBeginningComponent, canActivate: [isLoggedInGuard]},
  { path: "multiTest", component: MultipleChoiceComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
