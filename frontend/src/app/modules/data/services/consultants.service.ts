import {Injectable} from '@angular/core';
import {Http} from "@angular/http";
import {Consultant} from "../models/consultant";
import {Observable} from "rxjs/Observable";

@Injectable()
export class ConsultantsService {
  constructor(private http: Http) {
  }

  public getAll(): Observable<Consultant[]> {
    return this.mockJData();
  }

  private mockJData(): Observable<Consultant[]> {
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
