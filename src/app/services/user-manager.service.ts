import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserManagerService {
  protected static userName = '';

  constructor() { }

  setName(name: string) {
    UserManagerService.userName = name;
  }

  getName(): string {
    return UserManagerService.userName;
  }

  static isLoggedIn(): boolean {
    return UserManagerService.userName !== '';
  }

}
