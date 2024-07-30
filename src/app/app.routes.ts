import { Routes } from '@angular/router';
import { HomeComponent } from './MyComponents/home/home.component';
import { PlanTripComponent } from './MyComponents/plan-trip/plan-trip.component';
import { CountriesListComponent } from './MyComponents/countries-list/countries-list.component';

export const routes: Routes = [
    {path:'',component:HomeComponent},
    {path:'home',component:HomeComponent},
    {path:'planTrip',component:PlanTripComponent},
    {path:'countriesList',component:CountriesListComponent}
];
