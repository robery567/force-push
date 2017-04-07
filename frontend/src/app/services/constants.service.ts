import { Injectable } from '@angular/core';

@Injectable()
export class ConstantsService {

  constructor() { }

  public getBackendUri() {
    return "http://url123";
  }
}
