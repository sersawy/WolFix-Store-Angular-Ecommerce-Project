import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth-service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer implements OnInit {
  authService = inject(AuthService);
  islogged: boolean = false;
  ngOnInit(): void {
    this.authService.islogged$.subscribe((data) => {
      this.islogged = data;
    });
  }
}
