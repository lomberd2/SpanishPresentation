import { CanActivateFn } from '@angular/router';
import {UserManagerService} from "../services/user-manager.service";
import {IS_DEV} from "../../main";

export const isLoggedInGuard: CanActivateFn = (route, state) => {
  if (UserManagerService.isLoggedIn()) {
    return true;
  }
  // Redirect to the landing page if the user isnt logged in
  setTimeout(() => {
    window.location.href = '/spanish-presentation/';
    window.location.reload();
  }, 100);
  return false;
};
