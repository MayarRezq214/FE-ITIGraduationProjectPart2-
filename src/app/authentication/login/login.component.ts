import { Component } from '@angular/core';
import { FormControl, FormGroup , Validators} from '@angular/forms';
import { LoginDto } from '../../types/LoginDto';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Token } from '@angular/compiler';
import { phoneNumberLengthValidator } from 'src/app/services/loginPhonNumber.serrvice';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  credentials: LoginDto = {phoneNumber : '', password: ''};
  rememberMe!: boolean;
  selctedOption?: string;
  constructor(private authenticationService: AuthenticationService){}
  form = new FormGroup({
    username: new FormControl<string>('' , [Validators.required ,  phoneNumberLengthValidator , this.onlyNumbersValidator]),
    password: new FormControl<string>('' , [Validators.required]),
    isRememberable: new FormControl<boolean>(false)
  });

  onlyNumbersValidator(control:any) {
    const numericInputValue = control.value;
    const isValid = /^\d+$/.test(numericInputValue);

    return isValid ? null : { 'invalidNumber': true };
  }


  handleLogin(e: Event){
    e.preventDefault();
    // console.log(this.form.controls.isRememberable.value)
    this.rememberMe = this.form.controls.isRememberable.value!;
    // console.log(this.form.controls..value)
   // var credentials = new LoginDto();
    this.credentials!.phoneNumber = this.form.controls.username.value?? '';
    this.credentials!.password = this.form.controls.password.value ?? '';

    if(this.selctedOption == 'Admin'){
      this.authenticationService.login(this.credentials! , this.rememberMe).subscribe((token) => {
        this.authenticationService.PhoneNumber =  this.credentials!.phoneNumber;
      });
    }else if(this.selctedOption == 'Doctor'){
      this.authenticationService.Doctorlogin(this.credentials! , this.rememberMe).subscribe((token) => {
        this.authenticationService.PhoneNumber =  this.credentials!.phoneNumber;
      });
    }else if(this.selctedOption == 'Reception'){
      this.authenticationService.receptionLogin(this.credentials! , this.rememberMe).subscribe((token) => {
        this.authenticationService.PhoneNumber =  this.credentials!.phoneNumber;
      });
    }
    
  }

  onSelect(e: Event){
    this.selctedOption = (e.target as HTMLInputElement).value
  }



  get formVal() {
    return this.form.controls;
  }
}
