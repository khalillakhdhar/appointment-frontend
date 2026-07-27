import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  Appointment,
  AppointmentStatus,
  CreateAppointmentRequest,
  UpdateAppointmentStatusRequest
} from '../models/appointment.model';

@Injectable({ providedIn: 'root' })
export class AppointmentService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/appointments`;

  getAll(): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(this.apiUrl);
  }

  getById(id: number): Observable<Appointment> {
    return this.http.get<Appointment>(`${this.apiUrl}/${id}`);
  }

  searchByFullName(fullName: string): Observable<Appointment[]> {
    const params = new HttpParams().set('fullName', fullName.trim());
    return this.http.get<Appointment[]>(`${this.apiUrl}/search`, { params });
  }

  create(request: CreateAppointmentRequest): Observable<Appointment> {
    return this.http.post<Appointment>(this.apiUrl, request);
  }

  updateStatus(
    id: number,
    status: Exclude<AppointmentStatus, 'Pending'>
  ): Observable<Appointment> {
    const request: UpdateAppointmentStatusRequest = { status };
    return this.http.put<Appointment>(`${this.apiUrl}/${id}/status`, request);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
