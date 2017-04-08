import {Injectable} from '@angular/core';
import {Http} from "@angular/http";
import {Consultant} from "../models/consultant";
import {Observable} from "rxjs/Observable";
import {ConstantsService} from "../../../services/constants.service";
import {specializations} from "./mockSpecializations";
import {Specialization} from "../models/specialization";

@Injectable()
export class ConsultantsService {
  constructor(private http: Http,
              private constants: ConstantsService) {
  }

  public getAll(): Observable<Consultant[]> {
    return this.getAllMock();
  }

  public getSpecializations(): Observable<Specialization[]> {
    return this.getSpecializationsMock();
  }

  private getSpecializationsMock(): Observable<Specialization[]> {
    const specs: any[] = specializations;

    return Observable.create(observer => {
      setTimeout(() => {
        observer.next(specs);
      }, 250);
    });
  }

  private getAllMock(): Observable<Consultant[]> {
    const consultants: Consultant[] = [];
    for (let i = 0; i < 10; i++) {
      consultants.push({
        name: `Nume ${i}`,
        phones: [`975323223${i}`, `0752333${i}`],
        county: `Județ ${i}`,
        legitimation: `3423 3434 ${i}`,
        specializations: ["O specializare", "Altă specializare"],
      });
    }

    const observable = Observable.create(observer => {
      setTimeout(() => {
        observer.next(consultants);
      }, 250);
    });
    return observable;
  }

}
