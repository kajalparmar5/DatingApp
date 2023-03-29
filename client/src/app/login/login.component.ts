import { Component, OnInit } from '@angular/core';
import { AccountService } from '../_services/account.service';
//import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  data: any = {};
  isloggedin = false;

  constructor(
    private router: Router,
    private service: AccountService,
    private toster: ToastrService
  ) {}

  ngOnInit(): void {}

  onLogin() {
    this.service.login(this.data).subscribe({
      next: () => {
        this.isloggedin = true;
        this.router.navigate(['/']);
      },
      error: (error) => {
        // this.toster.error(error.error);
        // console.log(error);

        if (error.error.status == 400) {
          if (error.error.errors.Username) {
            this.toster.error(error.error.errors.Username);
          } else {
            this.toster.error(error.error.errors.Password);
          }
        } else {
         
          this.toster.error(error.error);
          console.log(error);
        }
      },
    });
  }
}
