import { Routes } from '@angular/router';
import { Home } from './features/home/home';
import { UserSelector } from './features/user-selector/user-selector';
import { AppointmentForm } from './features/appointment-form/appointment-form';
import { AppointmentSearch } from './features/appointment-search/appointment-search';
import { AdminDashboard } from './features/admin-dashboard/admin-dashboard';
import { Notfound } from './features/notfound/notfound';

export const routes: Routes = [
  {
    path:'' ,component:Home,title:'Accueil'
  },
  {
    path:'profiles',component:UserSelector,title:'Choisir un profile'
  },
  {
    path:'request',component:AppointmentForm,title:'nouvelle demande'
  },
  {
    path:'search',component:AppointmentSearch, title:"recherchez mes rendez-vous"
  },
  {
    path:'admin',component:AdminDashboard, title:'Administration'
  },
  {
    path:"**", component: Notfound,title: 'page not found'
  }
];
