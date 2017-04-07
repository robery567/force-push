import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ConsultantsListComponent} from './pages/consultants-list/consultants-list.component';
import {Chart1Component} from './pages/chart-1/chart-1.component';
import {ChartComponent} from "app/modules/data/components/chart/chart.component";
import {ChartsModule} from "ng2-charts";

@NgModule({
  imports: [
    CommonModule,
    ChartsModule
  ],
  declarations: [
    ConsultantsListComponent,
    Chart1Component,
    ChartComponent
  ],
  exports: [ConsultantsListComponent]
})
export class DataModule {
}
