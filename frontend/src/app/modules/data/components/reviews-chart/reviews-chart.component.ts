import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Consultant} from "../../models/consultant";
import {ConsultantsService} from "../../services/consultants.service";

@Component({
  selector: 'app-reviews-chart',
  templateUrl: './reviews-chart.component.html',
  styleUrls: ['./reviews-chart.component.scss']
})
export class ReviewsChartComponent implements OnInit {

  @Input()
  public consultant: Consultant;
  @ViewChild("unChart") private _chart;

  private canvasVisible: boolean;

  private notes: any = {};

  public barChartOptions: any = {
    scaleShowVerticalLines: true,
    responsive: true,
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  };
  public barChartLabels: string[] = [];
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartColors = [{
    backgroundColor: 'rgba(148,159,177,0.6)'
  }
  ];


  public barChartData: any[] = [
    {
      data: [],
      label: 'Evaluări'
    }
  ];

  constructor(private consultantsService: ConsultantsService) {
  }

  ngOnInit() {
    // console.log(123);
    // console.log(this.consultant);
    this.canvasVisible = false;
    this.consultantsService.getRatings(this.consultant.id).subscribe(data => {
      // console.log(data[0]);
      data.forEach(rating => {
        if (!this.notes[rating.score]) {
          this.notes[rating.score] = 0;
        }
        this.notes[rating.score]++;
      });
      this.barChartData[0].data = [];

      for (let i = 1; i <= 5; i++) {
        this.barChartData[0].data.push(this.notes[i]);
      }
      this.canvasVisible = true;
      this.processForTimeAvg(data);
    });

    this.consultantsService.getClients(this.consultant.id).subscribe(data => {
      let values
    });

    this.barChartLabels = [];
    for (let i = 1; i <= 5; i++) {
      this.barChartLabels.push(i.toString());
    }
  }


  public processForTimeAvg(ratings: any[]) {
    const arr = [];
    const totalLabels = {};
    try {
      ratings.forEach(rating => {
        const date_added = rating.date_added;
        const splitted = date_added.split("-");
        const year = splitted[0];
        const month = splitted[1];
        const day = splitted[2];
        const key = `${year}-${month}`;
        if (!arr[key]) {
          arr[key] = [];
        }
        arr[key].push(rating.score);
      });

      const keys = [];
      const avgValues = [];
      const cntValues = [];
      for (const key in arr) {
        if (!arr.hasOwnProperty(key)) {
          continue;
        }
        keys.push(key);
      }
      keys.sort();
      let lastSum = 0;
      let lastCnt = 0;
      for (let i = 0; i < keys.length; i++) {
        const tmr = arr[keys[i]];
        tmr.forEach(score => {
          lastSum += parseInt(score);
          lastCnt++;
        });
        let crtAvg = lastSum / lastCnt;
        crtAvg = Math.floor(crtAvg * 100) / 100;
        avgValues.push(crtAvg);
        cntValues.push(lastCnt);
      }
      this.lineChartLabels = keys;
      this.lineChartData[0].data = avgValues;
      this.lineChartData2[0].data = cntValues;

      // console.log(values);
    } catch (exc) {
      console.log(exc);
    }
  }



  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

  // lineChart
  public lineChartData: Array<any> = [
    {data: [], label: 'Media notelor'}
    // {data: [], label: 'Nr. note'}
  ];  // lineChart
  public lineChartData2: Array<any> = [
    {data: [], label: 'Nr. clienți'}
    // {data: [], label: 'Nr. note'}
  ];
  public lineChartLabels: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChartOptions: any = {
    responsive: true
  };
  public lineChartColors: Array<any> = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend: boolean = true;
  public lineChartType: string = 'line';

}
