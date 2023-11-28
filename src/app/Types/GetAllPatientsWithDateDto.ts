export interface GetAllPatientsWithDateDto {
    id: number;
    patientId: string | null;
    name: string | null;
    visitStatus: string | null;
    arrivalTime: string;
    visitStartTime: string; 
    visitEndTime: string; 
}