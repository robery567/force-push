import {Component, Input, OnInit} from '@angular/core';
import {Consultant} from "../../models/consultant";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-consultant-map',
  templateUrl: './consultant-map.component.html',
  styleUrls: ['./consultant-map.component.scss']
})
export class ConsultantMapComponent implements OnInit {

  @Input()
  public consultant: Consultant = null;

  private me: { lat: number, lng: number };
  private lat = 45.874654;
  private lng = 24.751460;
  private zoom = 7;
  private target: { lat: number, lng: number };

  constructor(public activeModal: NgbActiveModal) {
    this.me = {lat: this.lat, lng: this.lng};
  }

  ngOnInit() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(data => {
        const coords = data.coords;
        this.me.lat = coords.latitude;
        this.me.lng = coords.longitude;
      }, err => {
        console.log(err);
      });
    } else {
      console.log("no geolocation available");
    }
    this.target = {lat: 45.874654, lng: 24.751460};
  }

}
