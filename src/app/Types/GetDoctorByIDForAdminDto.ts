import { WeekScheduleForDoctorsDto } from "./WeekScheduleForDoctorsDto";


export interface GetDoctorByIDForAdminDto {
    id: string | null;
    name: string;
    title: string | null;
    description: string | null;
    phoneNumber: string | null;
    salary: number;
    dateOfBirth: string;
    specializationName: string;
    weekSchadual: WeekScheduleForDoctorsDto[] | null;
    imageFileName: string | null;
    imageStoredFileName: string | null;
    imageContentType: string | null;
    imageUrl: string | null;
}