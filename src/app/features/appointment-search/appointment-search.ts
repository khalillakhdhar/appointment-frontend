import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { StatusBadge } from '../../shared/components/status-badge/status-badge';
import { AppointmentService } from '../../core/services/apointment.service';
import { UserStorageService } from '../../core/services/user-storage-service';
import { readonly } from '@angular/forms/signals';
import { Appointment } from '../../core/models/appointment.model';
import { finalize } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-appointment-search',
  imports: [ReactiveFormsModule],
  templateUrl: './appointment-search.html',
  styleUrl: './appointment-search.css',
})
export class AppointmentSearch {
//injection de dépendences
  private readonly fb=inject(FormBuilder);
private  readonly service =inject(AppointmentService);
private readonly userStorage=inject(UserStorageService);
// variable d'état
readonly loading=signal(false);
readonly searched=signal(false);
readonly appointments=signal<Appointment[]>([]);

readonly errorMessage=signal('');
readonly searchForm=this.fb.nonNullable.group(
  {
    fullName:[this.userStorage.currentUser()?.fullName ?? '',[Validators.required,Validators.minLength(2)]]
  }
)
search():void{
  this.errorMessage.set('');
  this.searched.set(true);
  if(this.searchForm.invalid)
  {
    this.searchForm.markAllAsTouched();
    return ;
  }
  this.loading.set(true);
  this.service.searchByFullName(this.searchForm.controls.fullName.value)
  .pipe(finalize(()=>this.loading.set(false)))
  .subscribe(
    {
      next: appointments=>this.appointments.set(appointments),
      error: (error:HttpErrorResponse)=>
      {
        this.appointments.set([]);
        this.errorMessage.set(error.error?.message ?? 'La recherche est échoué. ')
      }
    }
  );
}



}
