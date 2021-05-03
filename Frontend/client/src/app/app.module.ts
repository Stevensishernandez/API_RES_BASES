import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { LoginComponent } from './components/login/login.component';
import { ConsultasComponent } from './components/consultas/consultas.component';
import { FormsModule } from '@angular/forms';

import { GamesService } from './services/games.service';
import { CPaisComponent } from './components/cpais/cpais.component';
import { CPreguntaComponent } from './components/c-pregunta/c-pregunta.component';
import { MInventosComponent } from './components/m-inventos/m-inventos.component';
import { MRespuestasComponent } from './components/m-respuestas/m-respuestas.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    LoginComponent,
    ConsultasComponent,
    CPaisComponent,
    CPreguntaComponent,
    MInventosComponent,
    MRespuestasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    GamesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
