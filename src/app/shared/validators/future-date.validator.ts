import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function todayOrFutureDateValidator(): ValidatorFn
{
  return (control: AbstractControl<string>)=>
  {
    if(!control.value) return null;
    const selectedDate= new Date(control.value+"T00:00:00");
    const today=new Date();
    today.setHours(0,0,0,0);
    return selectedDate< today ? {pastDate:true }: null;


  }
}
