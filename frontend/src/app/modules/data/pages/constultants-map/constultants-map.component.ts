import {Component, OnInit} from '@angular/core';
import {ConsultantsService} from "../../services/consultants.service";
import {Consultant} from "../../models/consultant";

@Component({
  selector: 'app-constultants-map',
  templateUrl: './constultants-map.component.html',
  styleUrls: ['./constultants-map.component.scss']
})
export class ConstultantsMapComponent implements OnInit {

  private me: { lat: number, lng: number };
  private lat = 45.874654;
  private lng = 24.751460;
  private zoom = 7;
  private consultants: Consultant[] = [];
  private coords: any = [];

  constructor(private consultantsService: ConsultantsService) {
    this.me = {lat: this.lat, lng: this.lng};
  }

  ngOnInit() {
    this.consultantsService.getCounties().subscribe(data => {
      data.forEach(county => {
        this.consultantsService.getConsultants({
          start: 0,
          count: 1,
          county: county.id,
          order_by_score: "desc"
        }).subscribe(cons => {
          // console.log(cons[0]);
          this.consultants.push(cons[0]);
          if (this.consultants.length == data.length) {
            this.putOnMap();
          }
        });
      });
    });
  }

  private putOnMap() {
    // console.log(this.consultants);
    this.consultants.forEach(consultant => {
      if (!consultant.city || !consultant.city[0] || !consultant.city[0].latitude || !consultant.city[0].longitude) {
        return;
      }
      const lat = consultant.city[0].latitude;
      const lng = consultant.city[0].longitude;
      this.coords.push({lat, lng});
    });
    console.log(this.coords);
  }

}
