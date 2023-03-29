import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { AccountService } from '../_services/account.service';
import { AuthService } from '../_services/auth.service';
import { Observable, of } from 'rxjs';
import { User } from '../_models/user';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit{
  //isLoggedIn = false;
  currentUser$:Observable<User|null>=of(null)

constructor(private router:Router,public service:AccountService,){}
  ngOnInit() {
    this.currentUser$=this.service.currentUser$
    //this.getCurrentUser();
    //this.getAuth()
  }
  getAuth(){
    // this.auth.getIsLoggedIn().subscribe((value) => {
    //   console.log(value)
    //   this.isLoggedIn = value;
    // });
  }
  // getCurrentUser(){
  //   this.service.currentUser$.subscribe(
  //     {
  //       next:user =>this.isLoggedIn=!!user,
  //       error:error =>console.log(error)
        
  //     }
  //   )
  // }
    
  onLogin()
  {
    this.router.navigate(['/login']);
  }
  onLogout(){
    this.service.logout()
    this.router.navigate(['/'])
    //this.isLoggedIn = false;
    //this.auth.setIsLoggedIn(false);
  }
}
