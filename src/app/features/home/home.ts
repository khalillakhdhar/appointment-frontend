import { Component, inject } from '@angular/core';
import { UserStorageService } from '../../core/services/user-storage-service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [
    RouterLink
  ],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
    readonly userStorage = inject(UserStorageService);

}
