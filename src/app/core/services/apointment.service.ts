import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Appointment, AppointmentStatus, CreateAppointRequest, UpdateAppointmentStatusRequest } from '../models/appointment.model';

@Injectable({
  providedIn: 'root',
})
export class ApointmentService {
private readonly http=inject(HttpClient);
private readonly apiUrl=  environment.apiUrl+"/appointments"
getAll()
{
  return this.http.get<Appointment[]>(this.apiUrl);

}
getById(id:number)
{
  return this.http.get<Appointment>(this.apiUrl+'/'+id);
}
searchByFullName(fullName:string)
{
  const params=new HttpParams().set("fullName",fullName.trim());
  return this.http.get<Appointment>(this.apiUrl+'/search',{params});

}
create(request:CreateAppointRequest)
{
  this.http.post<Appointment>(this.apiUrl,request);
}
updateStatus(id:number,status:Exclude<AppointmentStatus,'Pending'>)
{
  const request:UpdateAppointmentStatusRequest={status}
  return  this.http.put<Appointment>(this.apiUrl+"/"+id+"/status",request);

}
delete(id:number)
{
  return this.http.delete<void>(this.apiUrl+"/"+id);
}

}
