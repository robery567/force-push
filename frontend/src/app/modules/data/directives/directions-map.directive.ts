import {Directive, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {GoogleMapsAPIWrapper} from "angular2-google-maps/core";
declare var google: any;

@Directive({
  selector: 'sebm-google-map-directions'
})
export class DirectionsMapDirective implements OnInit, OnChanges {

  @Input() origin;
  @Input() destination;
  private directionsDisplay: any = null;
  private directionsService: any = null;

  constructor(private gmapsApi: GoogleMapsAPIWrapper) {

  }

  ngOnInit() {

  }

  ngOnChanges(changes: SimpleChanges): void {

    // console.log(this.origin);
    // console.log(this.destination);
    if (!this.origin || !this.destination) {
      return;
    }
    if (this.directionsDisplay != null) {
      this.directionsDisplay.setMap(null);
    }
    this.gmapsApi.getNativeMap().then(map => {
      this.directionsService = new google.maps.DirectionsService;
      this.directionsDisplay = new google.maps.DirectionsRenderer;
      this.directionsDisplay.setMap(map);
      const route = this.directionsService.route({
        origin: {lat: this.origin.lat, lng: this.origin.lng},
        destination: {lat: this.destination.lat, lng: this.destination.lng},
        waypoints: [],
        optimizeWaypoints: true,
        travelMode: 'DRIVING'
      }, (response, status) => {
        if (status === 'OK') {
          this.directionsDisplay.setDirections(response);
          this.directionsDisplay.setPanel(document.getElementById("directionsPanel"));
          console.log(response);
        } else {
          window.alert('Directions request failed due to ' + status);
        }
      });

    });
  }

}
