export type AppointmentStatus = 'Pending' | 'Accepted' | 'Rejected';

export interface Appointment {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  appointmentDate: string;
  appointmentTime: string;
  reason: string;
  status: AppointmentStatus;
  createdAt: string;
}

export interface CreateAppointmentRequest {
  fullName: string;
  email: string;
  phone: string;
  appointmentDate: string;
  appointmentTime: string;
  reason: string;
}

export interface UpdateAppointmentStatusRequest {
  status: Exclude<AppointmentStatus, 'Pending'>;
}
