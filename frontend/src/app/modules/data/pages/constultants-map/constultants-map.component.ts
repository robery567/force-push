import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-constultants-map',
  templateUrl: './constultants-map.component.html',
  styleUrls: ['./constultants-map.component.scss']
})
export class ConstultantsMapComponent implements OnInit {

  title = 'My first angular2-google-maps project';
  lat = 51.678418;
  lng = 7.809007;

  constructor() { }

  ngOnInit() {
  }

}
