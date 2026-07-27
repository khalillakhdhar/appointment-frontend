import { Component, inject } from '@angular/core';
import { UserStorageService } from '../../core/services/user-storage-service';
import { Router } from '@angular/router';
import { User } from '../../core/models/user.model';

@Component({
  selector: 'app-user-selector',
  imports: [],
  templateUrl: './user-selector.html',
  styleUrl: './user-selector.css',
})
export class UserSelector {
  readonly userStorage = inject(UserStorageService);
  private readonly router = inject(Router);

  select(user: User): void {
    this.userStorage.SelectUser(user);
    void this.router.navigateByUrl(user.role === 'admin' ? '/admin' : '/');
  }

}
