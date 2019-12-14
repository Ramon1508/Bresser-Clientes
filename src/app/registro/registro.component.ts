import { Component, OnInit } from '@angular/core';
import { UserService } from '../Services/user-service.service';
import { Router } from '@angular/router';
import Swal, { SweetAlertOptions } from "sweetalert2";
@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  Usuario: string;
  Pass: string;
  Nombre: string;
  Apellido: string;
  foto: string;
  Telefono: string;
  constructor(public usuarioservice: UserService, private router: Router) { }
  cargando = false;
  ngOnInit() {
  }
  Registrar() {
    this.cargando = true;
    if (this.Nombre == null || this.Nombre == ""){
      const opt: SweetAlertOptions = {
        icon: 'error',
        title: "¡Error!",
        text: "No has introducido tu nombre."
      };
      Swal.fire(opt);
      this.cargando = false;
    } else if (this.Apellido == null || this.Apellido == ""){
      const opt: SweetAlertOptions = {
        icon: 'error',
        title: "¡Error!",
        text: "No has introducido tu apellido."
      };
      Swal.fire(opt);
      this.cargando = false;
    } else if (this.Usuario == null || this.Usuario == ""){
      const opt: SweetAlertOptions = {
        icon: 'error',
        title: "¡Error!",
        text: "No has introducido tu correo electrónico."
      };
      Swal.fire(opt);
      this.cargando = false;
    } else if (this.Pass == null || this.Pass == ""){
      const opt: SweetAlertOptions = {
        icon: 'error',
        title: "¡Error!",
        text: "No has introducido tu contraseña."
      };
      Swal.fire(opt);
      this.cargando = false;
    } else if (this.Telefono == null || this.Telefono == ""){
      const opt: SweetAlertOptions = {
        icon: 'error',
        title: "¡Error!",
        text: "No has introducido tu teléfono."
      };
      Swal.fire(opt);
      this.cargando = false;
    } else {
      this.usuarioservice.Verificarcorreo(this.Usuario, ()=>{
        this.usuarioservice.Registrar(this.Nombre, this.Apellido, this.Usuario, this.Pass, this.foto, this.Telefono, ()=> {
          this.router.navigate(["/"]);
        }, ()=> {
          const opt: SweetAlertOptions = {
            icon: 'error',
            title: "¡Error!",
            text: "Ha ocurrido un error al registrarte."
          };
          Swal.fire(opt);
          this.cargando = false;
        });
      }, ()=>{
        const opt: SweetAlertOptions = {
          icon: 'error',
          title: "¡Error!",
          text: "Ha ocurrido un error al registrarte, ese correo ya está en uso."
        };
        Swal.fire(opt);
        this.cargando = false;
      });
    }
  }
}
