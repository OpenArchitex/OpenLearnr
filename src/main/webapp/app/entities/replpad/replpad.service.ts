import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { SERVER_API_URL } from 'app/app.constants';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ReplpadService {
  public resourceUrl = SERVER_API_URL + 'api/replPad';

  constructor(protected http: HttpClient) {}

  getREPLPad(): Observable<string> {
    return this.http.get(this.resourceUrl, { responseType: 'text' });
  }
}
