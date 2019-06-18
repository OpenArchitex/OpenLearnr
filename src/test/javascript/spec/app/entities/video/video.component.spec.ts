/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { OnlineTutorTestModule } from '../../../test.module';
import { VideoComponent } from 'app/entities/video/video.component';
import { VideoService } from 'app/entities/video/video.service';
import { Video } from 'app/shared/model/video.model';

describe('Component Tests', () => {
  describe('Video Management Component', () => {
    let comp: VideoComponent;
    let fixture: ComponentFixture<VideoComponent>;
    let service: VideoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [OnlineTutorTestModule],
        declarations: [VideoComponent],
        providers: []
      })
        .overrideTemplate(VideoComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(VideoComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(VideoService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Video('123')],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.videos[0]).toEqual(jasmine.objectContaining({ id: '123' }));
    });
  });
});
