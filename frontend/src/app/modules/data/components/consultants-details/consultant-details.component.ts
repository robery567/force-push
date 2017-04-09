import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Consultant} from "../../models/consultant";
import {ConsultantMapComponent} from "../consultant-map/consultant-map.component";
import {ConsultantsService} from "../../services/consultants.service";

@Component({
  selector: 'app-consultants-details',
  templateUrl: './consultant-details.component.html',
  styleUrls: ['./consultant-details.component.scss']
})
export class ConsultantDetailsComponent implements OnInit {

  @Input()
  public consultant: Consultant;

  private reviewChartVisible = false;

  constructor(public activeModal: NgbActiveModal,
              private modalService: NgbModal,
              private consultantsService: ConsultantsService) {
  }

  ngOnInit() {
    this.consultantsService.getRating(this.consultant.id).subscribe(data => {
      this.consultant.rating = data[0].score;
    });
  }

  public openMap() {
    const modalRef = this.modalService.open(ConsultantMapComponent, {size: "lg"});
    const consultantDetailsComponent: ConsultantMapComponent = modalRef.componentInstance;
    consultantDetailsComponent.consultant = this.consultant;
  }

  public toggleRatingGraph() {
    this.reviewChartVisible = !this.reviewChartVisible;
  }

}
