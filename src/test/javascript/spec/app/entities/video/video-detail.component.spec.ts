/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { OnlineTutorTestModule } from '../../../test.module';
import { VideoDetailComponent } from 'app/entities/video/video-detail.component';
import { Video } from 'app/shared/model/video.model';

describe('Component Tests', () => {
  describe('Video Management Detail Component', () => {
    let comp: VideoDetailComponent;
    let fixture: ComponentFixture<VideoDetailComponent>;
    const route = ({ data: of({ video: new Video('123') }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [OnlineTutorTestModule],
        declarations: [VideoDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(VideoDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(VideoDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.video).toEqual(jasmine.objectContaining({ id: '123' }));
      });
    });
  });
});
