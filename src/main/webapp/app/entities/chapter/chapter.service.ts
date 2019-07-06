import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IChapter } from 'app/shared/model/chapter.model';
import { IVideo } from 'app/shared/model/video.model';

type EntityResponseType = HttpResponse<IChapter>;
type EntityArrayResponseType = HttpResponse<IChapter[]>;

@Injectable({ providedIn: 'root' })
export class ChapterService {
  public resourceUrl = SERVER_API_URL + 'api/chapters';

  constructor(protected http: HttpClient) {}

  create(chapter: IChapter): Observable<EntityResponseType> {
    return this.http.post<IChapter>(this.resourceUrl, chapter, { observe: 'response' });
  }

  update(chapter: IChapter): Observable<EntityResponseType> {
    return this.http.put<IChapter>(this.resourceUrl, chapter, { observe: 'response' });
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http.get<IChapter>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IChapter[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: string): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getChaptersForCourse(courseID: string): Observable<EntityArrayResponseType> {
    return this.http.post<IChapter[]>(this.resourceUrl + '/chaptersForCourse', courseID, { observe: 'response' });
  }

  getPaidChaptersForCourse(courseID: string): Observable<EntityArrayResponseType> {
    return this.http.post<IChapter[]>(this.resourceUrl + '/paidChaptersForCourse', courseID, { observe: 'response' });
  }

  getVideosForChapters(chapterIDs: string[]): Observable<EntityArrayResponseType> {
    return this.http.post<IVideo[]>(this.resourceUrl + '/videosForChapters', chapterIDs, { observe: 'response' });
  }
}
