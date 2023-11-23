import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GetAdminByPhoneNumberDto } from '../types/GetAdminByPhoneNumberDto';
import { GetAllSpecializationForAdminDto } from '../types/GetAllSpecializationForAdminDto';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private client: HttpClient) { }
  public getAdminByPhoneNumber(phoneNumber: string): Observable<GetAdminByPhoneNumberDto>{
    return this.client.get<GetAdminByPhoneNumberDto>(`https://localhost:7267/api/Admins/Admin/${phoneNumber}`)
  }

  public getAllSpecializationsAndDoctors(): Observable<GetAllSpecializationForAdminDto[]>{
    return this.client.get<GetAllSpecializationForAdminDto[]>(`https://localhost:7267/api/Admins/Specializations`)
  }

}
