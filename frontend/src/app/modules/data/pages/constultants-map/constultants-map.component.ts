import {Component, OnInit} from '@angular/core';
import {ConsultantsService} from "../../services/consultants.service";
import {Consultant} from "../../models/consultant";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ConsultantMapComponent} from "../../components/consultant-map/consultant-map.component";
import {ConsultantDetailsComponent} from "../../components/consultants-details/consultant-details.component";

@Component({
  selector: 'app-constultants-map',
  templateUrl: './constultants-map.component.html',
  styleUrls: ['./constultants-map.component.scss']
})
export class ConstultantsMapComponent implements OnInit {

  public me: { lat: number, lng: number };
  private lat = 45.874654;
  private lng = 24.751460;
  public zoom = 7;
  private consultants: Consultant[] = [];
  public coords: any = [];

  constructor(private consultantsService: ConsultantsService,
              private modalService: NgbModal) {
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
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(data => {
        const coords = data.coords;
        this.me = {lat: coords.latitude, lng: coords.longitude};
      }, err => {
        console.log(err);
      });
    } else {
      console.log("no geolocation available");
    }
  }

  private putOnMap() {
    // console.log(this.consultants);
    this.consultants.forEach(consultant => {
      if (!consultant.city || !consultant.city[0] || !consultant.city[0].latitude || !consultant.city[0].longitude) {
        return;
      }
      const lat = parseFloat(consultant.city[0].latitude);
      const lng = parseFloat(consultant.city[0].longitude);
      this.coords.push({lat, lng, consultant});
    });
    // console.log(this.coords);
  }

  private markerClicked(consultant) {

    const modalRef = this.modalService.open(ConsultantDetailsComponent, {size: "lg"});
    const consultantDetailsComponent: ConsultantDetailsComponent = modalRef.componentInstance;
    consultantDetailsComponent.consultant = consultant;
  }

}
