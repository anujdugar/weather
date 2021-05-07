import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CityTemperatureComponent } from './component/city-temperature/city-temperature.component';
import { ForecastComponent } from './component/forecast/forecast.component';
import { PageNotFoundComponent } from './component/page-not-found/page-not-found.component';


export const routes: Routes = [
  {
    path: 'weather', component: CityTemperatureComponent
  },
  { path: 'forecast/:id', component: ForecastComponent },
  { path: '', pathMatch: 'full', redirectTo: '/weather' }, // redirect to `weather compoment`
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
