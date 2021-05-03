import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ConsultasComponent } from './components/consultas/consultas.component';
import { CPaisComponent } from './components/cpais/cpais.component';
import { CPreguntaComponent } from './components/c-pregunta/c-pregunta.component';
import { MInventosComponent } from './components/m-inventos/m-inventos.component';
import { MRespuestasComponent } from './components/m-respuestas/m-respuestas.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path:'login',
    component: LoginComponent
  },
  {
    path:'consultas',
    component: ConsultasComponent
  },
  {
    path:'pais',
    component: CPaisComponent
  },
  {
    path:'preguntas',
    component: CPreguntaComponent
  },
  {
    path:'Inventos',
    component: MInventosComponent
  },
  {
    path:'Respuestas',
    component: MRespuestasComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class AppRoutingModule { }
