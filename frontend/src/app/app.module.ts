import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HomePageComponent} from './pages/home-page/home-page.component';
import {SecondPageComponent} from './pages/second-page/second-page.component';
import {MainMenuComponent} from './components/main-menu/main-menu.component';
import {DataModule} from "./modules/data/data.module";
import {ConstantsService} from "./services/constants.service";
import {AgmCoreModule} from "angular2-google-maps/core";

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    SecondPageComponent,
    MainMenuComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    NgbModule.forRoot(),
    DataModule,
    AgmCoreModule.forRoot({apiKey: 'AIzaSyDhynj53iQ21EgQIwu-pf2JPRaP3dcF048'})
  ],
  providers: [
    ConstantsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
