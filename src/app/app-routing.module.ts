import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { UnacasaComponent } from './unacasa/unacasa.component';
import { ListacasasComponent } from './listacasas/listacasas.component';
import { ContactoasesorComponent } from './contactoasesor/contactoasesor.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'Login', component: LoginComponent },
  { path: 'SignUp', component: RegistroComponent },
  { path: 'Contacto', component: ContactoasesorComponent },
  { path: 'Detalles/:id', component: UnacasaComponent },
  { path: 'Busqueda/:id', component: ListacasasComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
