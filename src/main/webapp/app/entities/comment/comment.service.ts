import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IComment } from 'app/shared/model/comment.model';

type EntityResponseType = HttpResponse<IComment>;
type EntityArrayResponseType = HttpResponse<IComment[]>;

@Injectable({ providedIn: 'root' })
export class CommentService {
    private resourceUrl = SERVER_API_URL + 'api/comments';

    constructor(private http: HttpClient) {}

    create(comment: IComment): Observable<EntityResponseType> {
        return this.http.post<IComment>(this.resourceUrl, comment, { observe: 'response' });
    }

    update(comment: IComment): Observable<EntityResponseType> {
        return this.http.put<IComment>(this.resourceUrl, comment, { observe: 'response' });
    }

    find(id: string): Observable<EntityResponseType> {
        return this.http.get<IComment>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IComment[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: string): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    getCommentsForVideo(videoID: string) {
        return this.http.get<IComment[]>(`${this.resourceUrl}/commentsForVideo/${videoID}`, { observe: 'response' });
    }
}
