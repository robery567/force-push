import { Injectable } from '@angular/core';

@Injectable()
export class ConstantsService {

  constructor() { }

  public getBackendUri() {
    return "http://api2.robery.eu/";
  }
}
