import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {Consultant} from "../../models/consultant";

@Component({
  selector: 'app-consultants-details',
  templateUrl: './consultant-details.component.html',
  styleUrls: ['./consultant-details.component.scss']
})
export class ConsultantDetailsComponent implements OnInit {

  @Input()
  public consultant: Consultant;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

}
