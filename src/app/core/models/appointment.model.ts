
export type AppointmentStatus='Pending' | 'Accepted' | 'Rejected'
export interface Appointment {
  id:number;
  fullName:string;
  email:string;
  phone:string;
  AppointmentDate:string;
  AppointmentTime:string;
  reason:string;
  status:AppointmentStatus;
  createdAt:string;

}
export interface CreateAppointRequest{
   fullName:string;
  email:string;
  phone:string;
  AppointmentDate:string;
  AppointmentTime:string;
  reason:string;
}
export interface UpdateAppointmentStatusRequest {
  status: Exclude<AppointmentStatus,'Pending'>;
}
