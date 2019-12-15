import { Injectable } from '@angular/core';
import { DbService } from './db.service';
import { Usuario } from '../interfaces/usuario';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  Token: string = null;
  Usuario: Usuario = null;
  constructor(public crud: DbService) {
    this.Token = localStorage.getItem('Token');
    if (this.Token != null) {
      const userlogin = JSON.parse(this.Token);
      crud.db.collection('Usuarios')
      .where('correo', '==', userlogin.User)
      .where('contraseña', '==', userlogin.contraseña)
      .limit(1)
      .onSnapshot((res) => {
        res.forEach((doc) => {
          this.Usuario = JSON.parse(JSON.stringify(doc.data()));
          this.Usuario.id = doc.id;
        });
        if (res.size === 0) {
          this.Desconectar();
        }
      });
    }
  }
  Conectar(usuario: string, contraseña: string, exito, error) {
    usuario = usuario.toLowerCase();
    this.crud.db.collection('Usuarios')
    .where('correo', '==', usuario)
    .where('contraseña', '==', contraseña)
    .where('tipo', '==', 3)
    .limit(1).get().then((res) => {
      if (res.size > 0) {
        res.forEach((doc) => {
          this.Usuario = JSON.parse(JSON.stringify(doc.data()));
          const Token = {
            User: this.Usuario.correo,
            contraseña: this.Usuario.contraseña
          };
          localStorage.setItem('Token', JSON.stringify(Token));
          delete this.Usuario.contraseña;
          exito();
        });
      } else {
        error();
      }
    }).catch(() => {
      error();
    });
  }
  Desconectar() {
    this.Usuario = null;
    localStorage.removeItem('Token');
  }
  Verificarcorreo(correo: string, entonces, error) {
    this.crud.db.collection('Usuarios')
    .where('correo', '==', correo)
    .where('tipo', '==', 3)
    .get().then((res) => {
      if (res.size === 0) {
        entonces();
      } else {
        error();
      }
    });
  }
  Registrar(
    nombre: string,
    apellido: string,
    correo: string,
    contraseña: string,
    foto: string,
    telefono: string,
    exito, error
    ) {
    correo = correo.toLowerCase();
    this.crud.db.collection('Usuarios')
    .where('tipo', '==', 2)
    .get().then(snap => {
      const max = snap.size;
      const randomIndex = Math.floor(Math.random() * max);
      const agente = snap.docs[randomIndex].data();
      agente.id = snap.docs[randomIndex].id;
      console.log(agente);
      this.Usuario = {
        nombre,
        correo,
        contraseña,
        foto,
        apellido,
        telefono,
        tipo: 3,
        favoritos: [],
        agente_id: agente.id
      };
      this.crud.db.collection('Usuarios').add(this.Usuario).then(() => {
        const Token = {
          User: this.Usuario.correo,
          contraseña: this.Usuario.contraseña
        };
        localStorage.setItem('Token', JSON.stringify(Token));
        exito();
      }).catch(() => {
        error();
      });
    });
  }
}
