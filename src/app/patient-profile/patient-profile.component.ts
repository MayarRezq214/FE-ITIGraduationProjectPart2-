import { Component, OnInit } from '@angular/core';
import { PatientService } from '../services/patientByPhoneNumber.service';
import { GetPatientByPhoneDTO } from '../types/GetPatientByPhoneNumberDto';
import { MutualVisitsService } from '../services/getMutualVisits.service';
import { GetPatientVisitsChildDTO } from '../types/GetPatientVisitChildDto';
import { UpdatePatientVisitService } from '../services/updatePatientVisit.service';
import { FormGroup , FormControl } from '@angular/forms';
import { UpdatePatientVisitDto } from '../types/UpdatePatientVisitDto';

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
  visits?: GetPatientVisitsChildDTO[]=[];
  id : number = 0
  dateOfVisit:any;
  comments:string='';
  symptoms:string='';
  prescription:string='';
  udpateDto : any;
  buttonEnabled = false;
  formSubmitted: boolean[] = [];
  cardButtonEnabled: boolean[] = [];

  constructor(private patientService: PatientService ,
     private mutualVisits : MutualVisitsService ,
     private updateParientVisitService:UpdatePatientVisitService) {}

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

    this.mutualVisits.getMutualVisits("01289603610","string").subscribe({
      next: (mutualVisit:GetPatientVisitsChildDTO) => {
        console.log(typeof(mutualVisit))
        this.visits = Object.values(mutualVisit);
        this.id = mutualVisit.id;
        this.dateOfVisit = mutualVisit.dateOfVisit;
        if(mutualVisit.prescription != null){
          this.prescription = mutualVisit.prescription;
        }
        if(mutualVisit.symptoms != null){
          this.symptoms = mutualVisit.symptoms!;
        }
        if(mutualVisit.comments != null){
          this.comments = mutualVisit.comments!;
        }

        console.log("visits:"+ this.visits);
        this.visits = this.visits.sort((a, b) => new Date(b.dateOfVisit).getTime() - new Date(a.dateOfVisit).getTime());

      },
      error: (error) => {
        console.error('Error fetching visits:', error);
      },
    });
    this.cardButtonEnabled = new Array(this.visits?.length).fill(true);
  }

  form = new FormGroup({
    symptoms: new FormControl<string>(''),
    comments: new FormControl<string>(''),
    prescription: new FormControl<string>('')
  })

onSubmit(e: Event , Id:number , i:number) {
    this.udpateDto = {
      id: Id,
      symptoms: this.form.controls['symptoms'].value,
      comments: this.form.controls['comments'].value,
      prescription: this.form.controls['prescription'].value,
    }

    this.updateParientVisitService.updatePatientVisit(this.udpateDto).subscribe(
      (response) => {
        console.log("updated");
        console.log(this.udpateDto)
        console.log(this.udpateDto.id)
        console.log(this.udpateDto.symptoms)
        console.log(this.udpateDto.comments)
        console.log(this.udpateDto.prescription)
      },
      (error) => {
        console.log("wrong responseee");
      }
    );
    let subButton = e.target as HTMLElement;
    subButton.style.display = "none";
    this.form.disable();
    this.formSubmitted[i] = true;
    this.cardButtonEnabled = new Array(this.visits?.length).fill(true);
    this.cardButtonEnabled[i] = false;
  }


  enableButton(index: number) {
    this.cardButtonEnabled[index] = true;
  }
}


