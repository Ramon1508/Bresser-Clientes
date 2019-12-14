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
      .get()
      .then((res) => {
        res.forEach((doc) => {
          this.Usuario = JSON.parse(JSON.stringify(doc.data()));
          delete this.Usuario.contraseña;
        });
        if (res.size === 0) {
          this.Desconectar();
        }
      });
    }
  }
  Conectar(usuario: string, contraseña: string, exito, error) {
    this.crud.db.collection('Usuarios').where('correo', '==', usuario).where('contraseña', '==', contraseña).limit(1).get().then((res) => {
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
  async Verificarcorreo(correo: string, entonces, error) {
    this.crud.db.collection('Usuarios').where('correo', '==', correo).get().then((res) => {
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
    usuario: string,
    contraseña: string,
    foto: string,
    telefono: string,
    exito, error
    ) {
    this.Usuario = {
      nombre,
      correo: usuario,
      contraseña,
      foto,
      apellido,
      telefono
    };
    this.crud.db.collection('Usuarios').add(this.Usuario).then(() => {
      exito();
    }).catch(() => {
      error();
    });
  }
}
