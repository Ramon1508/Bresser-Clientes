import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Propiedad } from '../interfaces/propiedad';
import { DbService } from '../Services/db.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  Casas: Propiedad[] = [];
  constructor(public crud: DbService) {
    const self = this;
    crud.db.collection('Propiedades').onSnapshot((SnapShots) => {
      SnapShots.forEach(element => {
        const casa: Propiedad = JSON.parse(JSON.stringify(element.data()));
        casa.precio = parseFloat(casa.precio.toString());
        casa.id = element.id;
        self.Casas.push(casa);
      });
    })
  }
  abreMaps(casa: Propiedad){
    const url = "https://www.google.com/maps/dir/?api=1&destination=" + casa.latitud.toString() + "," + casa.longitud.toString();
    const win = window.open(url, '_blank');
    win.focus();
  }
  abreDireccion(casa: Propiedad){
    const url = "https://www.google.com/maps/search/?api=1&query=" + casa.latitud.toString() + "," + casa.longitud.toString();
    const win = window.open(url, '_blank');
    win.focus();
  }
  ngOnInit() {
  }
}
