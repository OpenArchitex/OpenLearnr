/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { take, map } from 'rxjs/operators';
import { VideoService } from 'app/entities/video/video.service';
import { IVideo, Video } from 'app/shared/model/video.model';

describe('Service Tests', () => {
  describe('Video Service', () => {
    let injector: TestBed;
    let service: VideoService;
    let httpMock: HttpTestingController;
    let elemDefault: IVideo;
    let expectedResult;
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = {};
      injector = getTestBed();
      service = injector.get(VideoService);
      httpMock = injector.get(HttpTestingController);

      elemDefault = new Video(
        'ID',
        'AAAAAAA',
        0,
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAA_NAME',
        'AAAAAAA',
        'AAAA_NAME',
        [{ name: 'AA', url: 'AAA' }],
        false
      );
    });

    describe('Service methods', () => {
      it('should find an element', async () => {
        const returnedFromService = Object.assign({}, elemDefault);
        service
          .find('123')
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: elemDefault });
      });

      it('should create a Video', async () => {
        const returnedFromService = Object.assign(
          {
            id: 'ID'
          },
          elemDefault
        );
        const expected = Object.assign({}, returnedFromService);
        service
          .create(new Video(null))
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should update a Video', async () => {
        const returnedFromService = Object.assign(
          {
            name: 'BBBBBB',
            episode: 1,
            description: 'BBBBBB',
            url: 'BBBBBB',
            courseID: 'BBBBBB',
            chapterID: 'BBBBBB',
            resource: [{ name: 'BB', url: 'BBB' }],
            isSample: true
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);
        service
          .update(expected)
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should return a list of Video', async () => {
        const returnedFromService = Object.assign(
          {
            name: 'BBBBBB',
            episode: 1,
            description: 'BBBBBB',
            url: 'BBBBBB',
            courseID: 'BBBBBB',
            chapterID: 'BBBBBB',
            resource: [{ name: 'BB', url: 'BBB' }],
            isSample: true
          },
          elemDefault
        );
        const expected = Object.assign({}, returnedFromService);
        service
          .query(expected)
          .pipe(
            take(1),
            map(resp => resp.body)
          )
          .subscribe(body => (expectedResult = body));
        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a Video', async () => {
        const rxPromise = service.delete('123').subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
