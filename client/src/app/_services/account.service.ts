import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { User } from '../_models/user';


@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private currentUserSource= new BehaviorSubject<User|null>(null)
  currentUser$=this.currentUserSource.asObservable()


  constructor(private http:HttpClient) { }

  login(data:User){
      return this.http.post<User>('http://localhost:5258/api/account/login',data).pipe(
        map((response:User)=>{
          const user=response
          if(user){
            localStorage.setItem('user',JSON.stringify(user));
            this.currentUserSource.next(user)

          }
          return user
        })
      )
    }
    register(model:User){
      return this.http.post<User>('http://localhost:5258/api/account/register',model).pipe(
        map(user=>{
          if(user){
            localStorage.setItem('user',JSON.stringify(user))
            this.currentUserSource.next(user)
          }
          return user
        })
      )
    }

    setCurrentUser(user:User){
      this.currentUserSource.next(user)
    }
  logout(){
    localStorage.removeItem('user')
    this.currentUserSource.next(null)

  }
  
}
