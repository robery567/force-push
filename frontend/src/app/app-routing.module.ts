import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomePageComponent} from "./pages/home-page/home-page.component";
import {SecondPageComponent} from "./pages/second-page/second-page.component";
import {ConsultantsListComponent} from "./modules/data/pages/consultants-list/consultants-list.component";
import {DataModule} from "app/modules/data/data.module";
import {ConstultantsMapComponent} from "./modules/data/pages/constultants-map/constultants-map.component";

const routes: Routes = [
  // {
  //   path: '',
  //   children: [
  {path: '', component: HomePageComponent},
  {path: 'home', component: HomePageComponent},
  {path: 'second', component: SecondPageComponent},
  {path: 'list', component: ConsultantsListComponent},
  {path: 'map', component: ConstultantsMapComponent}
  // ]
  // }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    DataModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
