import { Component, OnInit } from '@angular/core';
import { DbService } from '../Services/db.service';
import { UserService } from '../Services/user-service.service';
import { Usuario } from '../interfaces/usuario';

@Component({
  selector: 'app-contactoasesor',
  templateUrl: './contactoasesor.component.html',
  styleUrls: ['./contactoasesor.component.css']
})
export class ContactoasesorComponent implements OnInit {
  agente: Usuario = null;
  constructor(public crud: DbService, public uservice: UserService) {
    const idagente = uservice.Usuario.agente_id;
    const self = this;
    crud.db.collection('Usuarios').doc(idagente).get().then((doc) => {
      self.agente = JSON.parse(JSON.stringify(doc.data()));
      self.agente.id = doc.id;
      delete self.agente.contrasena;
    });
  }

  ngOnInit() {
  }

}
