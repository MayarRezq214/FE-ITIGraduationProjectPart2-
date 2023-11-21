import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { RegisterDoctorDto } from '../Types/RegisterDoctorDto';
import { Observable } from 'rxjs';
import { GetAllSpecializationsDto } from '../Types/GetAllSpecializationsDto';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  constructor(private client : HttpClient) { }

  public registerDoctor(register : RegisterDoctorDto) : Observable<object>{
    return this.client.post(`https://localhost:7267/api/Doctor/Doctor/register`,register);
  }
  public GetAllSpecializations(): Observable<GetAllSpecializationsDto[]>{
    return this.client.get<GetAllSpecializationsDto[]>('https://localhost:7267/api/Doctor/GetAllSpecialization');}

}
