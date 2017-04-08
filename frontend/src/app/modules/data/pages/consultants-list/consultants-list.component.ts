import {Component, OnInit} from '@angular/core';
import {Consultant} from "../../models/consultant";
import {ConsultantsService} from "../../services/consultants.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ConsultantDetailsComponent} from "../../components/consultants-details/consultant-details.component";
import {Specialization} from "app/modules/data/models/specialization";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

@Component({
  selector: 'app-consultants-list',
  templateUrl: './consultants-list.component.html',
  styleUrls: ['./consultants-list.component.scss']
})
export class ConsultantsListComponent implements OnInit {

  private columns: TableColumn[] = [];

  private consultants: Consultant[] = [];

  private specializations: Specialization[] = [];
  private model: string;

  constructor(private consultantsService: ConsultantsService,
              private modalService: NgbModal) {
    this.buildTable();
  }

  ngOnInit() {
    this.consultantsService.getAll().subscribe(data => {
      this.consultants = data;
    });
    this.consultantsService.getSpecializations().subscribe(data => {
      this.specializations = data;
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

  search = (text$: Observable<string>) =>
    text$
      .debounceTime(200)
      .distinctUntilChanged()
      .map(term => {
          const x = term.length < 2 ? []
            : this.specializations.filter(v => new RegExp(term, 'gi').test(v.name)).splice(0, 10).map(spec => {
              return spec.name;
            });
          console.log(x);
          return x;
        }
      );
}

class TableColumn {
  title: string;
  key: string;
}
