import {Component, OnInit} from '@angular/core';

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

  constructor() {
    this.me = {lat: this.lat, lng: this.lng};
  }

  ngOnInit() {
  }

}
