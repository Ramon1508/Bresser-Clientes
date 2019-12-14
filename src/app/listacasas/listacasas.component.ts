import { Component, OnInit } from '@angular/core';
import { Propiedad } from '../interfaces/propiedad';

@Component({
  selector: 'app-listacasas',
  templateUrl: './listacasas.component.html',
  styleUrls: ['./listacasas.component.css']
})
export class ListacasasComponent implements OnInit {
  Casas: Propiedad[] = [];
  constructor() {
    const casa: Propiedad = {
      id: "25",
      titulo: "casita",
      propietario_id: "prop25",
      precio: 1500,
      tipoVenta: 1,
      domicilio: "",
      cp: "81200",
      latitud: 25.7874269,
      longitud: -108.9871337,
      timestamp: 1576350007069,
      estado: true,
      imagenes: [
        "https://firebasestorage.googleapis.com/v0/b/bresser.appspot.com/o/35614112019%2F2fbf8877-6844-468a-a2a8-77e668dee43e.jpg?alt=media&token=736819ac-5426-4f9d-aef4-a3a9428fd25e",
        "https://firebasestorage.googleapis.com/v0/b/bresser.appspot.com/o/114614112019%2F385261db7060501bdb9b8e3af62774eb.png?alt=media&token=ba26d33d-e045-4871-bf11-23e2707d1e0d",
        "https://firebasestorage.googleapis.com/v0/b/bresser.appspot.com/o/35814112019%2F0001%20A5-1.png?alt=media&token=f9879de1-3653-45d7-8758-6f43a663afca"
      ]
    }
    this.Casas.push(
      casa
    )
    for (let index = 0; index < 11; index++) {
      this.Casas.push(casa);
    }
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
