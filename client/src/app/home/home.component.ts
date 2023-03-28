import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  flag=false
  user: any=[]

  constructor(private http:HttpClient){}
  ngOnInit() {
    this.getUsers()
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

}
