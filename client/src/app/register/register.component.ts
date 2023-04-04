import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { User } from '../_models/user';
import { ToastrService } from 'ngx-toastr';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();
  data: any = {};
  registerForm:FormGroup =new FormGroup({})

  constructor(private service: AccountService, private tostr: ToastrService) {}
  ngOnInit(): void {
    this.initializeForm()
  }

  initializeForm(){
   this.registerForm=new FormGroup({
    username:new FormControl('',Validators.required),
    password:new FormControl('',[Validators.required,
    Validators.minLength(4),Validators.maxLength(8)]),
    confirmPassword:new FormControl('',[Validators.required,this.matchValue('password')]),
   });
   this.registerForm.controls['password'].valueChanges.subscribe({
      next:()=>{
        this.registerForm.controls['confirmPassword'].updateValueAndValidity()
      }
   })
  }

  matchValue(matchTo:string):ValidatorFn{
    return(control:AbstractControl)=>{
      return control.value===control.parent?.get(matchTo)?.value?null:{notMatching:true}
    }
  }

  onRegister() {

    console.log(this.registerForm?.value);
    
    // this.service.register(this.data).subscribe({
    //   next: () => {
    //     this.cancel();
    //   },
    //   error: (error) => {
    //     //this.tostr.error(error.error);
    //     if (error.error.errors.Username) {
    //       this.tostr.error(error.error.errors.Username);
    //     } else {
    //       this.tostr.error(error.error.errors.Password);
    //     }
    //   },
    // });
  }
  cancel() {
    this.cancelRegister.emit(false);
  }
}
