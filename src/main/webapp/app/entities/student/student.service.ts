import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IStudent } from 'app/shared/model/student.model';

type EntityResponseType = HttpResponse<IStudent>;
type EntityArrayResponseType = HttpResponse<IStudent[]>;

@Injectable({ providedIn: 'root' })
export class StudentService {
    private resourceUrl = SERVER_API_URL + 'api/students';

    constructor(private http: HttpClient) {}

    create(student: IStudent): Observable<EntityResponseType> {
        return this.http.post<IStudent>(this.resourceUrl, student, { observe: 'response' });
    }

    update(student: IStudent): Observable<EntityResponseType> {
        return this.http.put<IStudent>(this.resourceUrl, student, { observe: 'response' });
    }

    find(id: string): Observable<EntityResponseType> {
        return this.http.get<IStudent>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IStudent[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: string): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
