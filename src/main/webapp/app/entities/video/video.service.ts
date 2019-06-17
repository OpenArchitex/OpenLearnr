import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IVideo } from 'app/shared/model/video.model';

type EntityResponseType = HttpResponse<IVideo>;
type EntityArrayResponseType = HttpResponse<IVideo[]>;

@Injectable({ providedIn: 'root' })
export class VideoService {
    private resourceUrl = SERVER_API_URL + 'api/videos';

    constructor(private http: HttpClient) {}

    create(video: IVideo): Observable<EntityResponseType> {
        return this.http.post<IVideo>(this.resourceUrl, video, { observe: 'response' });
    }

    update(video: IVideo): Observable<EntityResponseType> {
        return this.http.put<IVideo>(this.resourceUrl, video, { observe: 'response' });
    }

    find(id: string): Observable<EntityResponseType> {
        return this.http.get<IVideo>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IVideo[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: string): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
