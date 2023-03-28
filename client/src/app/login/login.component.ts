import { Component, OnInit } from '@angular/core';
import { AccountService } from '../_services/account.service';
//import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  data:any={}
  isloggedin=false

  constructor(private router:Router,private service:AccountService  ){}

  ngOnInit(): void {
    
  }

  onLogin(){
    this.service.login(this.data).subscribe(res=>
      {
        console.log(res);
      this.isloggedin = true;
     // this.auth.setIsLoggedIn(true);
      this.router.navigate(['/']);
      })
     }
     
  
}
