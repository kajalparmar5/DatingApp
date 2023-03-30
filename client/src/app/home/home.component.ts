import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../_models/user';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  flag=false
  
  user: any=[]
  currentUser$:Observable<User|null>=of(null)

  constructor(private http:HttpClient,private service:AccountService){}
  ngOnInit() {
    this.currentUser$=this.service.currentUser$
    // this.getUsers()
  }
  registerToggle(){
    this.flag=!this.flag
  }
  getUsers(){
    this.http.get('http://localhost:5258/api/users').subscribe((res) => {
      this.user = res;
      console.log(this.user);
    });
  }
  cancelRegisterMode(event :boolean){
        this.flag=event
  }

}
