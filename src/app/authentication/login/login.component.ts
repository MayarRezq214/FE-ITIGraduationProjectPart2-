import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { LoginDto } from '../../types/LoginDto';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Token } from '@angular/compiler';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private authenticationService: AuthenticationService){}
  form = new FormGroup({
    username: new FormControl<string>('string'),
    password: new FormControl<string>('string'),
  });
  credentials?: LoginDto;
  handleLogin(e: Event){
    e.preventDefault();
    
    // var credentials = new LoginDto();
    this.credentials!.phoneNumber = this.form.controls.username.value ?? '';
    this.credentials!.password = this.form.controls.password.value ?? '';
    this.authenticationService.login(this.credentials!).subscribe((token) => {
      console.log(token)
    }) 
  }
}
