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
import {County} from "../../models/county";
import {ConsultantMapComponent} from "../../components/consultant-map/consultant-map.component";

@Component({
  selector: 'app-consultants-list',
  templateUrl: './consultants-list.component.html',
  styleUrls: ['./consultants-list.component.scss']
})
export class ConsultantsListComponent implements OnInit {

  private columns: TableColumn[] = [];

  private consultants: Consultant[] = [];

  private counties: County[] = [];

  private specializations: Specialization[] = [];
  private modelCounty: any;
  private modelSpecialization: any;
  private selectedCounty: County;
  private selectedSpecialization: Specialization;

  private modelName: string;
  private keyUpsSinceLastSearch = 0;
  private lastSearchTrackNumber = 0;

  private maxListLength = 125;

  constructor(private consultantsService: ConsultantsService,
              private modalService: NgbModal) {
    this.buildTable();
  }

  ngOnInit() {
    this.consultantsService.getConsultants({
      start: 0,
      count: this.maxListLength,
      county: "170",
      specialization: "429"
    }).subscribe(data => {
      this.consultants = data;
      // this.consultantDetails(this.consultants[0]);
    });
    this.consultantsService.getSpecializations().subscribe(data => {
      this.specializations = data;
    });
    this.consultantsService.getCounties().subscribe(data => {
      this.counties = data;
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
      key: "counties"
    });
    // this.columns.push({
    //   title: "Nr. Legitimație",
    //   key: "legitimation"
    // });
    this.columns.push({
      title: "Specializări",
      key: "specializations",
      "hidden-md-down": true
    });
  }

  public consultantDetails(consultant: Consultant): void {
    const modalRef = this.modalService.open(ConsultantDetailsComponent, {size: "lg"});
    const consultantDetailsComponent: ConsultantDetailsComponent = modalRef.componentInstance;
    consultantDetailsComponent.consultant = consultant;
  }

  public format(consultant: Consultant, column: TableColumn): string {

    try {
      let value: string;
      if (column.key === "specializations" || column.key === 'counties') {
        value = consultant[column.key].map(nt => nt.name).join(", ");
      } else {
        value = consultant[column.key];
      }
      const maxVisibleLength = 300;
      if (value.length > maxVisibleLength) {
        value = value.substr(0, maxVisibleLength);
        value = value.trim();
        while (value.endsWith(',')) {
          value = value.substr(0, value.length - 1).trim();
        }
        value += " ...";
      }
      return value;
    } catch (exc) {
      console.log(exc);
      console.log(column.key);
    }
  }

  public specializationSelected($event) {
    console.log("specializationSelected");
    setTimeout(() => {
      this.modelSpecialization = this.getNameFormatter($event.item);
    }, 10);
    this.selectedSpecialization = $event.item;
  }

  public countySelected($event) {
    console.log("countySelected");
    setTimeout(() => {
      this.modelCounty = this.getNameFormatter($event.item);
    }, 10);
    this.selectedCounty = $event.item;
  }

  public doSearch() {
    const model: any = {start: 0, count: this.maxListLength};
    if (this.selectedCounty) {
      model.county = this.selectedCounty.id;
    }
    if (this.selectedSpecialization) {
      model.specialization = this.selectedSpecialization.id;
    }

    this.consultantsService.getConsultants(model).subscribe(data => {
      this.consultants = data;
      console.log(data);
    });
  }

  getNameFormatter = (obj: any) => obj.name;

  searchSpecialization = (text$: Observable<string>) =>
    text$
      .debounceTime(200)
      .distinctUntilChanged()
      .map(term => {
          const x = term.length < 2 ? []
            : this.specializations.filter(v => new RegExp(term, 'gi').test(v.name)).splice(0, 10).map(spec => {
              this.selectedSpecialization = null;
              this.modelName = null;
              return spec;
            });
          // console.log(x);
          return x;
        }
      )

  searchCounty = (text$: Observable<string>) =>
    text$
      .debounceTime(200)
      .distinctUntilChanged()
      .map(term => {
          const x = term.length < 2 ? []
            : this.counties.filter(v => new RegExp(term, 'gi').test(v.name)).splice(0, 10).map(county => {
              this.selectedCounty = null;
              this.modelName = null;
              return county;
            });
          // console.log(x);
          return x;
        }
      )

  public openMap(consultant: Consultant) {
    const modalRef = this.modalService.open(ConsultantMapComponent, {size: "lg"});
    const consultantDetailsComponent: ConsultantMapComponent = modalRef.componentInstance;
    consultantDetailsComponent.consultant = consultant;
  }

  public searchNameChanged() {
    this.keyUpsSinceLastSearch++;
    if (this.keyUpsSinceLastSearch <= 2) {
      return;
    }
    if (!this.modelName) {
      return;
    }
    this.keyUpsSinceLastSearch = 0;
    this.selectedSpecialization = null;
    this.selectedCounty = null;
    this.modelSpecialization = null;
    this.modelCounty = null;

    const lstn = this.lastSearchTrackNumber = Math.floor(Math.random() * 1000);

    this.consultantsService.searchByName({
      name: this.modelName,
      start: 0,
      count: this.maxListLength
    }).subscribe(data => {
      if (this.lastSearchTrackNumber !== lstn) {
        console.log("some request arrived too late");
        return;
      }
      this.consultants = data;
    });

    console.log("search");
  }
}

class TableColumn {
  title: string;
  key: string;
  "hidden-md-down"?: boolean;
}
