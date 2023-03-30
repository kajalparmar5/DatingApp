import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-server-error',
  templateUrl: './server-error.component.html',
  styleUrls: ['./server-error.component.css']
})
export class ServerErrorComponent {

  error:any

  constructor( private rout:Router){
    const navigation= this.rout.getCurrentNavigation()
    this.error=navigation?.extras?.state?.['error']

  }

}
