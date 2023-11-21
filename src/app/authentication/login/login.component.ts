import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  form = new FormGroup({
    username: new FormControl<string>('string'),
    password: new FormControl<string>('string'),
  });

  handleLogin(e: Event){
    e.preventDefault();
  }
}
