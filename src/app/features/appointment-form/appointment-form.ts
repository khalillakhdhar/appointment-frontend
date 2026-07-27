import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AppointmentService } from '../../core/services/apointment.service';
import { UserStorageService } from '../../core/services/user-storage-service';
import { todayOrFutureDateValidator } from '../../shared/validators/future-date.validator';
import { CreateAppointmentRequest } from '../../core/models/appointment.model';
import { finalize } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-appointment-form',
  imports: [ReactiveFormsModule],
  templateUrl: './appointment-form.html',
  styleUrl: './appointment-form.css',
})
export class AppointmentForm {
//DI
private readonly fb=inject(FormBuilder);
private readonly appointmentService =inject(AppointmentService);
private readonly userStorage=inject(UserStorageService);
// value initialization
readonly loading =signal(false);
readonly submitted=signal(false);
readonly successMessage=signal('');
readonly errorMessage=signal('');
readonly minDate=new Date().toISOString().split('T')[0];
// coding logics
readonly form=this.fb.nonNullable.group(
  {
    fullName:[this.userStorage.currentUser()?.fullName ?? '',[Validators.required,Validators.minLength(3),Validators.maxLength(100)]],
    email:['',[Validators.required,Validators.email]],
    phone:['',[Validators.required,Validators.pattern(/^[0-9]{8}$/) ] ],
    appointmentDate:['',Validators.required,todayOrFutureDateValidator()],
    appointmentTime:['',Validators.required],
    reason: ['',Validators.required,Validators.minLength(10),Validators.maxLength(200)]
  }
);
reasonRemaining(): number
{
  return 200-this.form.controls.reason.value.length;
}
isInvalid(controleName: keyof typeof this.form.controls)
{
  const control=this.form.controls[controleName];
  return control.invalid &&(control.touched || this.submitted);
}
submit() :void
{
this.submitted.set(true);
this.successMessage.set('');
this.errorMessage.set('');
if(this.form.invalid)
{
  this.form.markAllAsTouched();
  return;
}
const request: CreateAppointmentRequest=
{
  ... this.form.getRawValue(),
  appointmentTime: this.form.controls.appointmentTime.value+":00"
};
this.loading.set(true);
this.appointmentService.create(request)
.pipe(finalize(()=>this.loading.set(false)))
.subscribe(
  {
    next: ()=>
    {
      this.successMessage.set("votre demande a été envoyé avec succés");
      this.form.reset({
        fullName:this.userStorage.currentUser()?.fullName ?? '',
        email:'',phone:'',appointmentDate:'',appointmentTime:'',reason:''

      });
      this.submitted.set(false);
    },
    error:(error:HttpErrorResponse)=>
    {
      this.errorMessage.set(error.error?.message ?? 'Impossible d envoyer la demande');
    }
  }
)
}




}
