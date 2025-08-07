import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  calculerTrajetVoiture(distanceKm: number, consommationPour100Km: number, typeCarburant: 'essence' | 'diesel') {
    const params = new HttpParams()
      .set('distanceKm', distanceKm)
      .set('consommationPour100Km', consommationPour100Km)
      .set('typeCarburant', typeCarburant);
    return firstValueFrom(this.http.get<{ empreinteCarbone: number }>(`${this.baseUrl}/calculerTrajetVoiture`, { params }));
  }

  calculerTrajetAvion(distanceKm: number) {
    const params = new HttpParams().set('distanceKm', distanceKm);
    return firstValueFrom(this.http.get<{ empreinteCarbone: number }>(`${this.baseUrl}/calculerTrajetAvion`, { params }));
  }

  calculerTrajetTrain(distanceKm: number, typeCarburant: 'electricite' | 'diesel') {
    const params = new HttpParams()
      .set('distanceKm', distanceKm)
      .set('typeCarburant', typeCarburant);
    return firstValueFrom(this.http.get<{ empreinteCarbone: number }>(`${this.baseUrl}/calculerTrajetTrain`, { params }));
  }

  getEmpreinteCarbone(idUtilisateur: number) {
    const params = new HttpParams().set('idUtilisateur', idUtilisateur);
    return firstValueFrom(this.http.get<{ empreinteCarbone: number }>(`${this.baseUrl}/monEmpreinteCarbone`, { params }));
  }

  ajouterEmpreinteCarbone(idUtilisateur: number, empreinteCarbone: number) {
    return firstValueFrom(this.http.put(`${this.baseUrl}/ajouterEmpreinteCarbone`, { idUtilisateur, empreinteCarbone }));
  }

  retirerEmpreinteCarbone(idUtilisateur: number, empreinteCarbone: number) {
    return firstValueFrom(this.http.put(`${this.baseUrl}/retirerEmpreinteCarbone`, { idUtilisateur, empreinteCarbone }));
  }

  supprimerEmpreinteCarbone(idUtilisateur: number) {
    return firstValueFrom(this.http.post(`${this.baseUrl}/supprimerEmpreinteCarbone`, { idUtilisateur }));
  }
}
