import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public login = "";
  public password = "";
  public error = "";

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  async loginUser() {
    this.error = "";
    if (this.login.length < 3) {
      this.error = "Le login doit faire au moins 3 caractères";
    } else if (this.password.length < 6) {
      this.error = "Le mot de passe doit faire au moins 6 caractères";
    } else {
      try {
        await this.userService.login("Jean");
        this.router.navigate(["summary"]);
      } catch (err) {
        console.error(err);
      }
    }
  }

}