import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../core/service/user.service';
import { AuthService } from '../../core/service/auth.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home implements OnInit {

  login = '';
  password = '';
  error = '';
  showPassword = false;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) {}
  

  ngOnInit(): void {
    const session = this.authService.getSession();
    if (session) {
      this.router.navigate(['summary']);
    }
  }
  
  loginUser(): void {
    this.error = '';
  
    if (this.login.length < 3) {
      this.error = 'Le login doit faire au moins 3 caractères';
      return;
    }
  
    if (!this.authService.isStrongPassword(this.password)) {
      this.error = 'Mot de passe trop faible : min 8 caractères, majuscule, chiffre, caractère spécial';
      return;
    }
  
    const success = this.authService.login(this.login, this.password);
  
    if (!success) {
      this.error = 'Identifiants incorrects';
      return;
    }
  
    this.router.navigate(['summary']);
  }  
}
