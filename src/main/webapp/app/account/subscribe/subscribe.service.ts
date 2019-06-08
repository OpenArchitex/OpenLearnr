import { Injectable } from '@angular/core';
import { SERVER_API_URL } from 'app/app.constants';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SubscribeService {
    private resourceUrl = SERVER_API_URL + 'api/payment';

    constructor(private http: HttpClient) {}

    find(): Observable<any> {
        return this.http.get(this.resourceUrl, { responseType: 'text' });
    }
}
