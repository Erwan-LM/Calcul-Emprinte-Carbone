import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

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

  empreinteCarbone: number | null = null;
  diminution: number = 0;

  private http = inject(HttpClient);
  private route = inject(ActivatedRoute);

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const username = params.get('username');
      if (username) {
        this.loadProfile(username);
      }
    });
  }

  loadProfile(username: string): void {
    const storedProfile = localStorage.getItem('userProfile');
    if (storedProfile) {
      const parsedProfile = JSON.parse(storedProfile);
      if (parsedProfile.username === username) {
        this.profile = parsedProfile;
      } else {
        this.profile = { username, firstname: '', lastname: '', email: '', bio: '' };
      }
    } else {
      this.profile = { username, firstname: '', lastname: '', email: '', bio: '' };
    }
    this.fetchEmpreinteCarbone();
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
    this.empreinteCarbone = null;
  }

  fetchEmpreinteCarbone(): void {
    if (!this.profile.username) return;
    this.http.get<{ empreinteCarbone: number }>(`http://localhost:8080/monEmpreinteCarbone`, {
      params: { idUtilisateur: this.profile.username }
    }).subscribe({
      next: data => this.empreinteCarbone = data?.empreinteCarbone ?? 0,
      error: () => this.empreinteCarbone = 0
    });
  }

  resetEmpreinteCarbone(): void {
    if (!this.profile.username) return;
    this.http.post(`http://localhost:8080/supprimerEmpreinteCarbone`, { idUtilisateur: this.profile.username })
      .subscribe(() => this.empreinteCarbone = 0);
  }

  diminuerEmpreinteCarbone(): void {
    if (!this.profile.username || this.diminution <= 0) return;
    this.http.put(`http://localhost:8080/retirerEmpreinteCarbone`, {
      idUtilisateur: this.profile.username,
      empreinteCarbone: this.diminution
    }).subscribe(() => {
      this.empreinteCarbone = (this.empreinteCarbone ?? 0) - this.diminution;
      if (this.empreinteCarbone < 0) this.empreinteCarbone = 0;
      this.diminution = 0;
    });
  }
}
