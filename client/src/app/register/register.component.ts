import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  @Input()usersFromHomeComponent:any
  data:any

  onRegister(){
      console.log(this.usersFromHomeComponent)
  }

}
