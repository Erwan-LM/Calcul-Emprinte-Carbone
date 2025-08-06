import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './profile.html',
  styleUrls: ['./profile.css']
})
export class Profile implements OnInit {

  profile = {
    username: '',
    firstname: '',
    lastname: '',
    email: '',
    bio: ''
  };

  ngOnInit(): void {
    const storedProfile = localStorage.getItem('userProfile');
    if (storedProfile) {
      this.profile = JSON.parse(storedProfile);
    }
  }

  saveProfile(): void {
    localStorage.setItem('userProfile', JSON.stringify(this.profile));
    alert("Profil sauvegardé !");
  }

  resetProfile(): void {
    this.profile = {
      username: '',
      firstname: '',
      lastname: '',
      email: '',
      bio: ''
    };
    localStorage.removeItem('userProfile');
  }
}
