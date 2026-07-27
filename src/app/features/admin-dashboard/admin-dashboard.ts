import { Component, computed, inject, signal } from '@angular/core';
import { AppointmentService } from '../../core/services/apointment.service';
import { Appointment, AppointmentStatus } from '../../core/models/appointment.model';
import { finalize } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-admin-dashboard',
  imports: [],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css',
})
export class AdminDashboard {
  //DI
  private readonly service=inject(AppointmentService);
  //Init
  readonly appointments=signal<Appointment[]>([]);
  readonly filter=signal<'All' | AppointmentStatus>('All');
  readonly loading= signal(false);
  readonly actionId= signal<number | null>(null);
  readonly successMessage=signal('');
  readonly errorMessage=signal('');
// listing and stats
readonly total=computed(()=> this.appointments().length);
readonly pending=computed(()=> this.appointments().filter(a=>a.status==='Pending').length);
readonly accepted=computed(()=> this.appointments().filter(a=>a.status==='Accepted').length);
readonly rejected=computed(()=> this.appointments().filter(a=>a.status==='Rejected').length);
readonly filteredAppointments=computed(
  ()=> {
    const filter=this.filter();
    return filter ==='All' ? this.appointments() : this.appointments().filter(a=>a.status=== filter);

  });
  ngOnInit(): void {
   //

  }
loadAppointments():void{
  this.loading.set(true);
  this.errorMessage.set('');
  this.service.getAll().pipe(finalize(()=> this.loading.set(false))).subscribe(
    {
      next: appointments=>this.appointments.set(appointments),
      error:()=>this.errorMessage.set("impossible de charger les rendez-vous")
    }
  );

}
setFilter(filter:'All' | AppointmentStatus){
  this.filter.set(filter);
}
updateStatus(appointment:Appointment,status:'Accepted' | 'Rejected')
{
  this.actionId.set(appointment.id);
this.clearMessages();
this.service.updateStatus(appointment.id,status)
.pipe(finalize(()=>this.actionId.set(null)))
.subscribe(
{
  next: (updated:any) =>{
    this.appointments.update(items=>items.map(item=>item.id===updated.id ?updated : item))
    this.successMessage.set(status==='Accepted' ? 'la demande été accepté': 'La demande été refusé')
  },
  error: (error:HttpErrorResponse)=>this.errorMessage.set(error.error?.message ?? 'la modification a échoué.')
});

}
delete(appointment: Appointment)
{
  if(!confirm('Supprimer la demande de '+appointment.fullName)) return;
  this.actionId.set(appointment.id);
  this.clearMessages();
  this.service.delete(appointment.id)
  .pipe(finalize(()=>this.actionId.set(null)))
.subscribe(
{
  next: ()=>
  {
    this.appointments.update(items=>items.filter(item=>item.id!==appointment.id));
        this.successMessage.set("demande supprimé");

  },
    error: (error:HttpErrorResponse)=>this.errorMessage.set(error.error?.message ?? 'la suppressu=ion a échoué.')


});

}




private clearMessages()
{this.errorMessage.set('');
this.successMessage.set('');
}
}
