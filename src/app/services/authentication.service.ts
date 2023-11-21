import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginDto } from '../types/LoginDto';
import { Observable } from 'rxjs';
import { TokenDto } from '../types/TokenDto';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(private client: HttpClient ) { }
  public login(credentials: LoginDto): Observable<TokenDto>{
    return this.client.post<TokenDto>(
      'https://localhost:7267/api/Admins/Admins/login',
      credentials
    )
  }
}
