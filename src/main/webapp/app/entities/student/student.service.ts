import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IStudent } from 'app/shared/model/student.model';

type EntityResponseType = HttpResponse<IStudent>;
type EntityArrayResponseType = HttpResponse<IStudent[]>;

@Injectable({ providedIn: 'root' })
export class StudentService {
    private resourceUrl = SERVER_API_URL + 'api/students';

    private static convertDateFromClient(student: IStudent): IStudent {
        return Object.assign({}, student, {
            lastWatchedVideoTime:
                student.lastWatchedVideoTime != null && student.lastWatchedVideoTime.isValid()
                    ? student.lastWatchedVideoTime.toJSON()
                    : null
        });
    }

    private static convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.lastWatchedVideoTime = res.body.lastWatchedVideoTime != null ? moment(res.body.lastWatchedVideoTime) : null;
        return res;
    }

    constructor(private http: HttpClient) {}

    create(student: IStudent): Observable<EntityResponseType> {
        const copy = StudentService.convertDateFromClient(student);
        return this.http
            .post<IStudent>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => StudentService.convertDateFromServer(res));
    }

    update(student: IStudent): Observable<EntityResponseType> {
        const copy = StudentService.convertDateFromClient(student);
        return this.http
            .put<IStudent>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => StudentService.convertDateFromServer(res));
    }

    find(id: string): Observable<EntityResponseType> {
        return this.http
            .get<IStudent>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .map((res: EntityResponseType) => StudentService.convertDateFromServer(res));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IStudent[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res));
    }

    delete(id: string): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((student: IStudent) => {
            student.lastWatchedVideoTime = student.lastWatchedVideoTime != null ? moment(student.lastWatchedVideoTime) : null;
        });
        return res;
    }
}
