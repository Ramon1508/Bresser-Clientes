import { Component, OnInit } from '@angular/core';
import { Propiedad } from '../interfaces/propiedad';
import { DbService } from '../Services/db.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-listacasas',
  templateUrl: './listacasas.component.html',
  styleUrls: ['./listacasas.component.css']
})
export class ListacasasComponent implements OnInit {
  Casas: Propiedad[] = [];
  constructor(public crud: DbService, private _route:ActivatedRoute) {
    const busqueda = _route.snapshot.paramMap.get("id");
    console.log(busqueda);

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
