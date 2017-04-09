import {Injectable} from '@angular/core';
import {Http} from "@angular/http";
import {Consultant} from "../models/consultant";
import {Observable} from "rxjs/Observable";
import {ConstantsService} from "../../../services/constants.service";
import {specializations} from "./mockSpecializations";
import {Specialization} from "../models/specialization";
import {consultants} from "./mock.consultants";

@Injectable()
export class ConsultantsService {
  constructor(private http: Http,
              private constants: ConstantsService) {
  }

  public getAll(): Observable<Consultant[]> {
    return this.getAllMock();
  }

  public getSpecializations(): Observable<Specialization[]> {
    const url = `${this.constants.getBackendUri()}get/specializations`;
    return this.http.get(url).map(resp => resp.json());
  }

  public getCounties(): Observable<Specialization[]> {
    const url = `${this.constants.getBackendUri()}get/counties`;
    return this.http.get(url).map(resp => resp.json());
  }

  public getConsultants(model: any): Observable<Consultant[]> {
    // http://api2.robery.eu/get/consultants?specialization=425&county=165&start=1&count=10
    let url = `${this.constants.getBackendUri()}get/consultants?`;
    for (const prop in model) {
      if (!model.hasOwnProperty(prop)) {
        continue;
      }
      url += `${prop}=${model[prop]}&`;
    }
    return this.http.get(url).map(resp => {
      const consultants = resp.json();

      this.normalizeConsultants(consultants);
      return consultants;
    });
  }

  private getSpecializationsMock(): Observable<Specialization[]> {
    const specs: any[] = specializations;

    return Observable.create(observer => {
      setTimeout(() => {
        // observer.next(specs);
        observer.next([]);
      }, 250);
    });
  }

  private getAllMock(): Observable<Consultant[]> {
    const consults: any[] = consultants;
    this.normalizeConsultants(consults);

    const observable = Observable.create(observer => {
      setTimeout(() => {
        observer.next(consults);
      }, 250);
    });
    return observable;
  }

  private normalizeConsultants(consultants: any[]): void {

    consultants.forEach(consultant => {
      try {
        if (consultant.telephone) {
          consultant.phones = consultant.telephone.split(/[,;]/);
          for (let i = 0; i < consultant.phones.length; i++) {
            consultant.phones[i] = consultant.phones[i].trim().replace(/\//g, "");
          }
          delete consultant.telephone;
        }
        for (let i = 0; i < consultant.specializations.length; i++) {
          consultant.specializations[i].name = consultant.specializations[i].name.replace(/\( /, '(');
        }
      } catch (exc) {
        console.log(exc);
      }
    });
  }

  public searchByName(model: any): Observable<Consultant[]> {
    // http://api2.robery.eu/search/name?name=cristi&start=1&count=10
    let url = `${this.constants.getBackendUri()}search/name?`;
    if (!model.start) {
      model.start = 0;
    }
    if (!model.count) {
      model.count = 200;
    }
    if (!model.name) {
      console.log("invalid name for search");
      return null;
    }
    url += `name=${model.name}&`;
    url += `start=${model.start}&`;
    url += `count=${model.count}&`;
    return this.http.get(url).map(resp => resp.json());
  }

  public getRating(id: number): Observable<any> {
    // http://api2.robery.eu/get/reviews_average?id=4627
    const url = `${this.constants.getBackendUri()}get/reviews_average?id=${id}`;
    return this.http.get(url).map(resp => resp.json());
  }

  public getRatings(id: number): Observable<any> {
    // http://api2.robery.eu/get/reviews?id=4627
    const url = `${this.constants.getBackendUri()}get/reviews?id=${id}`;
    return this.http.get(url).map(resp => resp.json());
  }

  public getClients(id: number): Observable<any> {
    // http://api2.robery.eu/get/clients?id=4627
    const url = `${this.constants.getBackendUri()}get/clients?id=${id}`;
    return this.http.get(url).map(resp => resp.json());
  }
}
