import { Component, computed, input } from '@angular/core';
import { AppointmentStatus } from '../../../core/models/appointment.model';
import { readonly } from '@angular/forms/signals';

@Component({
  selector: 'app-status-badge',
  imports: [],
  templateUrl: './status-badge.html',
  styleUrl: './status-badge.css',
})
export class StatusBadge {
  readonly status=input.required<AppointmentStatus>();


  readonly label= computed(()=>(
  {
    Pending:'En attente',
    Accepted:'Accepté',
    Rejected:'Refusé'

  })[this.status()]
);
readonly cssClass=computed(()=>
({
Pending:'badge pending',
Accepted:'badge accepted',
Rejected:'badge rejected'
})[this.status()])

}
