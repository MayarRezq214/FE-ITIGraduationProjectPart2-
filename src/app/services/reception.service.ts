import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GetAllPatientsWithDateDto } from '../types/GetAllPatientsWithDateDto';
import { UpdateArrivalPatientStatusDto } from '../types/UpdateArrivalPatientStatusDto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReceptionService {
  constructor(private client : HttpClient) { }
  public UpdatePatientVisitStatus(patientVisit: UpdateArrivalPatientStatusDto):Observable<object>{
    return this.client.put(`https://localhost:7267/api/Admins/admins/updatePatientVisitStatus`, patientVisit );
   }
}
