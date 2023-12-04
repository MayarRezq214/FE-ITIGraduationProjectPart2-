import { Component } from '@angular/core';
import { PatientService } from '../services/patientByPhoneNumber.service';
import { GetPatientVisitDto } from '../types/GetPatientVisitDto';
import { PatientService2 } from '../services/patient.service';
import { empty } from 'rxjs';


@Component({
  selector: 'app-patient-visits',
  templateUrl: './patient-visits.component.html',
  styleUrls: ['./patient-visits.component.css']
})
export class PatientVisitsComponent {
patientPhoneNumbaer?: string;
patientVisits?: GetPatientVisitDto
  constructor(private patientService : PatientService2){}
  
  
  search() {
    if (!this.patientPhoneNumbaer) {
      return;
    }

    this.patientService.GetPatientVisitsByPhone(this.patientPhoneNumbaer).subscribe({
      next: (patientVisits) => {
        this.patientVisits = patientVisits;
      },
      error: (error) => {
        console.error('Error fetching visits:', error);
      },
    });
  }
  delete(e: Event , id: number){
    this.patientService.deleteAppointment(id).subscribe({
      next:()=>{
        this.patientService.GetPatientVisitsByPhone(this.patientPhoneNumbaer!).subscribe({
          next: (patientVisits) => {
            this.patientVisits = patientVisits;
          },
          error: (error) => {
            console.error('Error fetching visits:', error);
          },
        });
      },
      error:(error)=>{
        console.log("delete patient visit api failed",error)
      }
    })
  }
}
