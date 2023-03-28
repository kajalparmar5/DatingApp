import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  private isLoggedIn = new BehaviorSubject<boolean>(false);

  setIsLoggedIn(value: boolean): void {
    this.isLoggedIn.next(value);
  }

  getIsLoggedIn(): BehaviorSubject<boolean> {
    return this.isLoggedIn;
  }
}
