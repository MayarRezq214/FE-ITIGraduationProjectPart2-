import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginDto } from '../types/LoginDto';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { TokenDto } from '../types/TokenDto';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  PhoneNumber?:string;
  public isLoggedIn$ = new BehaviorSubject<boolean>(false);
  constructor(private client: HttpClient ) { }
  public login(credentials: LoginDto , isRememberable?: boolean): Observable<TokenDto>{
    return this.client
    .post<TokenDto>('https://localhost:7267/api/Admins/Admins/login',credentials)
    .pipe(
      tap((tokenDto) => {
        this.isLoggedIn$.next(true);
        if(isRememberable){
          localStorage.setItem('token' , tokenDto.token);
          localStorage.setItem('phoneNumber', credentials.phoneNumber);
        }
      })
    )
  }
}
