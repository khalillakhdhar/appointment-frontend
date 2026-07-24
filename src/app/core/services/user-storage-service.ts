import { computed, Injectable, signal } from '@angular/core';
import { STORAGE_KEYS } from '../constants/storage-keys';
import { User } from '../models/user.model';
import si from '@angular/common/locales/si';

@Injectable({
  providedIn: 'root',
})
export class UserStorageService {
  private readonly defaultUsers: User[]=
  [
    { id:1,fullName:'Administrateur',role:'admin'},
    {id:2,fullName:'Utilisateur simple',role:'user'}
  ]
  readonly users=signal<User[]>([]);
  readonly currentUser=signal<User | null>(null);
  readonly isAdmin=computed(()=>this.currentUser()?.role==='admin');
  readonly isSimpleUser=computed(()=>this.currentUser()?.role==='user');

constructor()
{
  this.initializeUsers();
  this.restoreCurrentUser();
}
SelectUser(user:User): void
{
localStorage.setItem(STORAGE_KEYS.currentUser,JSON.stringify(user));
this.currentUser.set(user);


}
clearCurrentUser():void
{
localStorage.removeItem(STORAGE_KEYS.currentUser);
this.currentUser.set(null);

}
private initializeUsers() :void
{
  const stroredUsers=this.readJson<User[]>(STORAGE_KEYS.users);
  if(stroredUsers?.length)
  {
    this.users.set(stroredUsers);
    return;
  }
  localStorage.setItem(STORAGE_KEYS.users,JSON.stringify(this.defaultUsers));
  this.users.set(this.defaultUsers);

}
private restoreCurrentUser()
{
  this.currentUser.set(this.readJson<User>(STORAGE_KEYS.currentUser));
}
private readJson<T>(key:string)
{
  const value=localStorage.getItem(key)
  if (!value) return null;
  try
  {
    return JSON.parse(value) as T;

  }
  catch
  {
    localStorage.removeItem(key);
    return null;
  }
}


}
