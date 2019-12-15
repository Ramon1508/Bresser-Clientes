import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Propiedad } from '../interfaces/propiedad';
import { DbService } from '../Services/db.service';
import { UserService } from '../Services/user-service.service';

@Component({
  selector: 'app-unacasa',
  templateUrl: './unacasa.component.html',
  styleUrls: ['./unacasa.component.css']
})
export class UnacasaComponent implements OnInit {
  casa: Propiedad = null;
  indiceimagen = 0;
  esfavorita = false;
  likehabilitado:boolean = false;
  constructor(public crud: DbService, public uservice: UserService, private _route: ActivatedRoute) {
    const self = this;
    const id = _route.snapshot.paramMap.get("id");
    crud.db.collection('Propiedades').doc(id).onSnapshot((snap) => {
      if (snap.data() == undefined || snap.data() == null){
        location.href = "/"
      }
      const casa: Propiedad = JSON.parse(JSON.stringify(snap.data()));
      casa.precio = parseFloat(casa.precio.toString());
      casa.id = snap.id;
      self.casa = casa;
      self.esfavorita = uservice.Usuario.favoritos.indexOf(casa.id) != -1;
      self.likehabilitado = true;
      if(!casa.estado){
        location.href = "/"
      }
    })
  }
  anterior(){
    if (this.indiceimagen == 0){
      this.indiceimagen = this.casa.imagenes.length - 1;
    } else {
      this.indiceimagen -= 1;
    }
  }
  cambiafab(){
    this.likehabilitado = false;
    let favoritos = this.uservice.Usuario.favoritos;
    if (this.esfavorita) {
      const i = favoritos.indexOf(this.casa.id);
      favoritos.splice(i, 1);
    } else {
      favoritos.push(this.casa.id);
    }
    const usuario = this.uservice.Usuario;
    usuario.favoritos = favoritos;
    this.crud.db.collection('Usuarios').doc(this.uservice.Usuario.id).set(usuario).then(()=>{
      this.esfavorita = !this.esfavorita;
      this.likehabilitado = true;
    });
  }
  siguiente(){
    if (this.indiceimagen == this.casa.imagenes.length - 1){
      this.indiceimagen = 0;
    } else {
      this.indiceimagen += 1;
    }
  }
  ngOnInit() {
  }

}
