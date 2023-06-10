import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserManagerService {
  protected static userName = ''
  protected static userScore = 0;
  protected static userPossiblePoints = 0;
  protected static userPossibleNegativePoints = 0;

  constructor() { }

  setName(name: string) {
    UserManagerService.userName = name;
  }

  getName(): string {
    return UserManagerService.userName;
  }

  getScore(): number {
    return UserManagerService.userScore;
  }

  addScore(score: number) {
    UserManagerService.userScore += score;
  }

  setPossiblePoints(possiblePoints: number) {
    UserManagerService.userPossiblePoints = possiblePoints;
  }

  getPossiblePoints(): number {
    return UserManagerService.userPossiblePoints;
  }

  setPossibleNegativePoints(possibleNegativePoints: number) {
    UserManagerService.userPossibleNegativePoints = possibleNegativePoints;
  }

  getPossibleNegativePoints(): number {
    return UserManagerService.userPossibleNegativePoints;
  }

  static isLoggedIn(): boolean {
    return UserManagerService.userName !== '';
  }

  /**
   * Sets the score to the given value.
   * @param score
   */
  setScore(score: number) {
    UserManagerService.userScore = score;
  }

  static resetScore() {
    UserManagerService.userScore = 0;
  }

  static resetName() {
    UserManagerService.userName = '';
  }

  static reset() {
    UserManagerService.resetName();
    UserManagerService.resetScore();
  }

  static getScoreString(): string {
    return UserManagerService.userScore.toString();
  }

  static getScoreStringWithLeadingZeros(): string {
    return UserManagerService.getScoreString().padStart(4, '0');
  }

}
