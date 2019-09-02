/* tslint:disable max-line-length */
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { OpenLearnrTestModule } from '../../../test.module';
import { CourseDetailComponent } from 'app/entities/course/course-detail.component';
import { Course } from 'app/shared/model/course.model';
import { MatSnackBarModule } from '@angular/material';
import { HttpResponse } from '@angular/common/http';
import { ChapterService } from 'app/entities/chapter';
import { Chapter } from 'app/shared/model/chapter.model';
import { CourseService } from 'app/entities/course';
import { Video } from 'app/shared/model/video.model';

describe('Component Tests', () => {
  describe('Course Management Detail Component', () => {
    let comp: CourseDetailComponent;
    let fixture: ComponentFixture<CourseDetailComponent>;
    let service: ChapterService;
    const route = ({ data: of({ course: new Course('123') }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [OpenLearnrTestModule, MatSnackBarModule],
        declarations: [CourseDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(CourseDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CourseDetailComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ChapterService);
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.course).toEqual(jasmine.objectContaining({ id: '123' }));
      });
    });

    describe('loadAllChaptersForCourse', () => {
      it('Should call getChaptersForCourse method of chapterService', fakeAsync(() => {
        // GIVEN

        const course = new Course('myCourse');
        const chapters = [new Chapter('abc', 'chapter1'), new Chapter('def', 'chapter2'), new Chapter('ghi', 'chapter3')];
        const videos = [new Video('abc', 'video1'), new Video('def', 'video2'), new Video('ghi', 'video3')];
        spyOn(service, 'getChaptersForCourse').and.returnValue(of(new HttpResponse({ body: chapters })));
        spyOn(service, 'getVideosForChapters').and.returnValue(of(new HttpResponse({ body: videos })));

        // WHEN
        // comp.loadAllChaptersForCourse(course);
        tick(); // simulate async

        // THEN
        // expect(service.getChaptersForCourse).toHaveBeenCalledWith(course.id);
        // expect(service.getVideosForChapters).toHaveBeenCalledWith(['abc', 'def', 'ghi']);
      }));
    });
  });
});
