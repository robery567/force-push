import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ConsultantsListComponent} from './pages/consultants-list/consultants-list.component';
import {Chart1Component} from './pages/chart-1/chart-1.component';
import {ChartComponent} from "app/modules/data/components/chart/chart.component";
import {ChartsModule} from "ng2-charts";
import {ConsultantsService} from "./services/consultants.service";
import {ConsultantDetailsComponent} from './components/consultants-details/consultant-details.component';
import {FormsModule} from "@angular/forms";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import { ConstultantsMapComponent } from './pages/constultants-map/constultants-map.component';
import {AgmCoreModule} from "angular2-google-maps/core";
import { ConsultantMapComponent } from './components/consultant-map/consultant-map.component';


@NgModule({
  imports: [
    CommonModule,
    ChartsModule,
    FormsModule,
    NgbModule,
    AgmCoreModule
  ],
  declarations: [
    ConsultantsListComponent,
    Chart1Component,
    ChartComponent,
    ConsultantDetailsComponent,
    ConstultantsMapComponent,
    ConsultantMapComponent
  ],
  providers: [
    ConsultantsService
  ],
  entryComponents: [
    ConsultantDetailsComponent,
    ConsultantMapComponent
  ],
  exports: [ConsultantsListComponent]
})
export class DataModule {
}
