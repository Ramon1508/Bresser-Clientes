import { Component, OnInit } from '@angular/core';
import { UserService } from '../Services/user-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  busqueda = "";
  constructor(public userservice: UserService, public router: Router) { }
  buscar() {
    location.href = 'Busqueda/' + this.busqueda;
  }
  ngOnInit() {
  }
  logout() {
    this.userservice.Desconectar();
  }
}
