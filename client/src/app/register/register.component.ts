import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { User } from '../_models/user';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  @Output() cancelRegister = new EventEmitter();
  data: any = {};

  constructor(private service: AccountService, private tostr: ToastrService) {}

  onRegister() {
    this.service.register(this.data).subscribe({
      next: () => {
        this.cancel();
      },
      error: (error) => {
        //this.tostr.error(error.error);
        if (error.error.errors.Username) {
          this.tostr.error(error.error.errors.Username);
        } else {
          this.tostr.error(error.error.errors.Password);
        }
      },
    });
  }
  cancel() {
    this.cancelRegister.emit(false);
  }
}
