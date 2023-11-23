import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { RegisterDoctorDto } from '../Types/RegisterDoctorDto';
import { Observable } from 'rxjs';
import { GetAllSpecializationsDto } from '../Types/GetAllSpecializationsDto';
import { GetDoctorByPhoneDto } from '../Types/GetDoctorByPhoneDto';
import { GetDoctorByIDDto } from '../Types/GetDoctorrByIDDto';
import { UpdateDoctorStatusDto } from '../Types/UpdateDoctorDto';
import { GetAllDoctorsDto } from '../Types/GetAllDoctorsDto';
import { GetDoctorsBySpecializationDto } from '../Types/GetDoctorsBySpecializationDto';
import { GetDoctorByIDForAdminDto } from '../Types/GetDoctorByIDForAdminDto';
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

    public UploadPhoto(drId : string, photo:string):Observable<object>{
      return this.client.post(`https://localhost:7267/api/Doctor/doctors/uploadimage/${drId}`,photo);
    }
    public GetDoctorByPhone(phone : string ): Observable<GetDoctorByPhoneDto>{
      return this.client.get<GetDoctorByPhoneDto>(`https://localhost:7267/api/Doctor/doctor/${phone}`);
    }
    public getDoctorById(id: string): Observable<GetDoctorByIDDto>{
      return this.client.get<GetDoctorByIDDto>(`https://localhost:7267/api/Doctor/doctors/${id}`);
    }
    public getDoctors(): Observable<GetAllDoctorsDto[]>{
      return this.client.get<GetAllDoctorsDto[]>('https://localhost:7267/api/Doctor');
    }
    public getDoctorsBySpecialization(id : number): Observable<GetDoctorsBySpecializationDto[]>{
      return this.client.get<GetDoctorsBySpecializationDto[]>(`https://localhost:7267/api/Doctor/doctors/specialization/${id}`);
    }
    
   public UpdateDoctor(drId:string, doctor : UpdateDoctorStatusDto):Observable<object>{
    return this.client.put(`https://localhost:7267/api/Admins/admins/updatedoctor/${drId}`,doctor);
   }

   public getDoctorByIdForAdmin(id:string): Observable<GetDoctorByIDForAdminDto>{
    return this.client.get<GetDoctorByIDForAdminDto>(`https://localhost:7267/api/Admins/admin/${id}`);
  }
   
  }