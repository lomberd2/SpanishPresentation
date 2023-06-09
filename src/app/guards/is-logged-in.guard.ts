import { CanActivateFn } from '@angular/router';
import {UserManagerService} from "../services/user-manager.service";

export const isLoggedInGuard: CanActivateFn = (route, state) => {
  if (UserManagerService.isLoggedIn()) {
    return true;
  }
  // Redirect to the landing page if the user isnt logged in
  setTimeout(() => {
    window.location.href = '/';
    window.location.reload();
  }, 100);
  return false;
};
