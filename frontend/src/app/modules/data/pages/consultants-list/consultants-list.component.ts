import {Component, OnInit} from '@angular/core';
import {Consultant} from "../../models/consultant";
import {ConsultantsService} from "../../services/consultants.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ConsultantDetailsComponent} from "../../components/consultants-details/consultant-details.component";

@Component({
  selector: 'app-consultants-list',
  templateUrl: './consultants-list.component.html',
  styleUrls: ['./consultants-list.component.scss']
})
export class ConsultantsListComponent implements OnInit {

  private columns: TableColumn[] = [];

  private consultants: Consultant[] = [];

  constructor(private consultantsService: ConsultantsService,
              private modalService: NgbModal) {
    this.buildTable();
  }

  ngOnInit() {
    this.consultantsService.getAll().subscribe((data) => {
      this.consultants = data;
    });
  }

  private buildTable() {
    this.columns.push({
      title: "Name",
      key: "name"
    });
    // this.columns.push({
    //   title: "Nr. Telefon",
    //   key: "phones"
    // });
    this.columns.push({
      title: "Județ",
      key: "county"
    });
    // this.columns.push({
    //   title: "Nr. Legitimație",
    //   key: "legitimation"
    // });
    this.columns.push({
      title: "Specializări",
      key: "specializations"
    });
  }

  public consultantDetails(consultant: Consultant): void {
    const modalRef = this.modalService.open(ConsultantDetailsComponent);
    const consultantDetailsComponent: ConsultantDetailsComponent = modalRef.componentInstance;
    consultantDetailsComponent.consultant = consultant;
  }

  public format(consultant: Consultant, column: TableColumn): string {
    let value: string;
    if (column.key === "specializations") {
      value = consultant[column.key].join(", ");
    } else {
      value = consultant[column.key];
    }
    const maxVisibleLength = 25;
    if (value.length > maxVisibleLength) {
      value = value.substr(0, maxVisibleLength);
      value = value.trim();
      while (value.endsWith(',')) {
        value = value.substr(0, value.length - 1).trim();
      }
      value += " ...";
    }
    return value;
  }
}

class TableColumn {
  title: string;
  key: string;
}
