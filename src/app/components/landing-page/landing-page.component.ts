import { Component } from '@angular/core';
import {UserManagerService} from "../../services/user-manager.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent {

  // Get for the input fields
  public name = '';

  constructor(private userManager: UserManagerService, private router: Router) {
  }

  public sanitizeName(once: boolean = false) {
    this.name = this.name.replace(/[^a-zA-Z0-9 ]/g, '');
    this.name = this.name.replace(/ +(?= )/g,'');
    // Remove all spaces
    this.name = this.name.replace(/\s/g, '');
  }


  public continue() {
    // Check if a valid name has been entered
    if (this.name.length <= 0) {
      // Show user error
      alert('Introduzca un nombre válido\n\nPlease enter a valid name');
      return;
    }

    this.sanitizeName();

    // Set the name
    this.userManager.setName(this.name);

    // Navigate to the next page [disclaimer]
    this.router.navigate(['/disclaimer']);
  }
}
