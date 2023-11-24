import { Component, OnInit } from '@angular/core';
import { PatientService } from '../services/patientByPhoneNumber.service';
import { GetPatientByPhoneDTO } from '../types/GetPatientByPhoneNumberDto';

@Component({
  selector: 'app-patient-profile',
  templateUrl: './patient-profile.component.html',
  styleUrls: ['./patient-profile.component.css']
})
export class PatientProfileComponent implements OnInit {
  patientDto?: GetPatientByPhoneDTO;
  name:string = '';
  phoneNumber : string = '';
  gender:string = '';
  dateOfBirth :any;
  constructor(private patientService: PatientService) {}

  ngOnInit(): void {
    this.patientService.getPatientByPhoneNumber("01289603610").subscribe({
      next: (patient: GetPatientByPhoneDTO) => {
        this.patientDto = patient;
        this.name = patient.name!;
        this.phoneNumber = patient.phoneNumber!;
        this.gender = patient.gender!;
        this.dateOfBirth = patient.dateOfBirth;
        console.log(patient)
      },
      error: (error) => {
        console.error('Error fetching patient data:', error);
      },
    });
  }
}



// import { Component, OnInit } from '@angular/core';
// import {PatientService} from '../services/patientByPhoneNumber.service'
// import { GetPatientByPhoneDTO } from '../types/GetPatientByPhoneNumberDto';
// @Component({
//   selector: 'app-patient-profile',
//   templateUrl: './patient-profile.component.html',
//   styleUrls: ['./patient-profile.component.css']
// })
// export class PatientProfileComponent implements OnInit {
//   patientDto?:GetPatientByPhoneDTO ;
//   constructor(private patientService:PatientService ) {

//   }

//   ngOnInit(): void {
//     this.patientService.getPatientByPhoneNumber("01289603610").subscribe(()=>{
//       next: (patient)=>{
//         this.patientDto = patient;
//         console.log(patient)
//       }
//     })

//   }
//   // this.patientByPhoneNumber.getPatientByPhoneNumber(this.phoneNumber)

// }
