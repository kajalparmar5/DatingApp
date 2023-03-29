import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test-error',
  templateUrl: './test-error.component.html',
  styleUrls: ['./test-error.component.css']
})
export class TestErrorComponent implements OnInit {
  constructor(private http:HttpClient){

  }
  ngOnInit() {
    
  }

  get404error(){
    this.http.get('http://localhost:5258/api/buggy/not-found').subscribe({
      next:res=>{
        console.log(res);
        
      },
      error:error=>{
        console.log(error);
        
      }
    })
  }

  get400error(){
    this.http.get('http://localhost:5258/api/buggy/bad-request').subscribe({
      next:res=>{
        console.log(res);
        
      },
      error:error=>{
        console.log(error);
        
      }
    })
  }

  get500error(){
    this.http.get('http://localhost:5258/api/buggy/server-error').subscribe({
      next:res=>{
        console.log(res);
        
      },
      error:error=>{
        console.log(error);
        
      }
    })
  }

  get401error(){
    this.http.get('http://localhost:5258/api/buggy/auth').subscribe({
      next:res=>{
        console.log(res);
        
      },
      error:error=>{
        console.log(error);
        
      }
    })
  }

  get400ValidationError(){
    this.http.get('http://localhost:5258/api/account/register').subscribe({
      next:res=>{
        console.log(res);
        
      },
      error:error=>{
        console.log(error);
        
      }
    })
  }

}
