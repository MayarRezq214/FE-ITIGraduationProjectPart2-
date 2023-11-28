import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MedicalHistoryDto } from '../types/MedicalHistoryDto';

@Injectable({
  providedIn: 'root',
})
export class MedicalHistoryService {

  constructor(private client: HttpClient) {}

  public updateMedicalHistory(updateDto: MedicalHistoryDto): Observable<any> {
    return this.client.put<any>('https://localhost:7267/api/Doctor/MedicalHistory', updateDto);
  }

  public getMedicalHistory(phone: string): Observable<MedicalHistoryDto> {
    return this.client.get<MedicalHistoryDto>(`https://localhost:7267/api/Patient/medical_history/${phone}`);
  }
}
