import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import {HttpClientModule} from '@angular/common/http';

import { RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { VentasComponent } from './ventas/ventas.component';
import { PreciosComponent } from './precios/precios.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {AngularFireModule} from '@angular/fire';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {environment} from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    VentasComponent,
    PreciosComponent
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    BrowserModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    RouterModule.forRoot([
      {path:'welcome', component:WelcomeComponent},
      {path:'ventas', component:VentasComponent},
      {path:'precios', component:PreciosComponent},
      {path:'', redirectTo:'welcome', pathMatch:'full'},
      {path:'**',redirectTo:'welcome',pathMatch:'full'}
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
