import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgClass } from '@angular/common';
import { NgStyle } from '@angular/common';
import { LoginGuard } from './login.guard';
import { AdminGuard } from './admin.guard';


import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { ActivateComponent } from './components/activate/activate.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DataService } from './data.service';
import { PageNotFountComponent } from './components/page-not-fount/page-not-fount.component';
import { ReserveringenComponent } from './components/reserveringen/reserveringen.component';
import { BestellingComponent } from './components/bestelling/bestelling.component';
import { GaragemanagerComponent } from './components/garagemanager/garagemanager.component';
import { UitrijdenComponent } from './components/uitrijden/uitrijden.component';
import { BinnenrijdenComponent } from './components/binnenrijden/binnenrijden.component';
import { BetaalComponent } from './components/betaal/betaal.component';
import { AdminComponent } from './components/admin/admin.component';
import { BaliemedewerkerComponent } from './components/baliemedewerker/baliemedewerker.component';

const appRoutes: Routes = [
  { path: '', component:  HomeComponent},
  { path: 'register', component:  RegisterComponent},
  { path: 'login', component: LoginComponent},
  { path: 'activate/:id/:token', component: ActivateComponent},
  { path: 'reserveringen', component: ReserveringenComponent, canActivate: [LoginGuard]},
  { path: 'bestelling', component: BestellingComponent, canActivate: [LoginGuard]},
  { path: 'garagemanager', component: GaragemanagerComponent, canActivate: [LoginGuard]},
  { path: 'binnenrijden/:userId/:id', component: BinnenrijdenComponent},
  { path: 'betalen/:userId/:bestellingId', component: BetaalComponent},
  { path: 'uitrijden/:userId/:bestellingId', component: UitrijdenComponent},
  { path: 'admin', component: AdminComponent, canActivate: [LoginGuard]},
  { path: 'baliemedewerker', component: BaliemedewerkerComponent, canActivate: [LoginGuard]},
  { path: '**', component: PageNotFountComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    ActivateComponent,
    PageNotFountComponent,
    ReserveringenComponent,
    BestellingComponent,
    GaragemanagerComponent,
    UitrijdenComponent,
    BinnenrijdenComponent,
    BetaalComponent,
    AdminComponent,
    BaliemedewerkerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    )
  ],
  providers: [
    DataService,
    LoginGuard,
    AdminGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
