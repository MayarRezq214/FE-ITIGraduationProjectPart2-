export interface RegisterDoctorDto {
    name: string ;
    title: string ;
    description: string;
    specializationId: number;
    salary: number;
    phoneNumber: string ;
    dateOfBirth: string;
    assistantID: string | null;
    assistantName: string | null;
    assistantPhoneNumber: string | null;
    assistantDateOfBirth: string;
    password: string;
}