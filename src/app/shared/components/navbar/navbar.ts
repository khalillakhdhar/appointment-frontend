import { Component, inject } from '@angular/core';
import { UserStorageService } from '../../../core/services/user-storage-service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
 readonly userStorage = inject(UserStorageService);
  private readonly router = inject(Router)

  changeProfile(): void {
    this.userStorage.clearCurrentUser();
    void this.router.navigateByUrl('/profiles');
  }


}
