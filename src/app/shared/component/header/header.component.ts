import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  nomUtilisateur = "";

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.loadData();
  }

  async loadData() {
    this.nomUtilisateur = await this.userService.getUsername();
  }
}