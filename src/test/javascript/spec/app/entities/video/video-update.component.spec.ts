/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { OpenLearnrTestModule } from '../../../test.module';
import { VideoUpdateComponent } from 'app/entities/video/video-update.component';
import { VideoService } from 'app/entities/video/video.service';
import { Video } from 'app/shared/model/video.model';
import { Course } from 'app/shared/model/course.model';
import { Chapter } from 'app/shared/model/chapter.model';

describe('Component Tests', () => {
  describe('Video Management Update Component', () => {
    let comp: VideoUpdateComponent;
    let fixture: ComponentFixture<VideoUpdateComponent>;
    let service: VideoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [OpenLearnrTestModule],
        declarations: [VideoUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(VideoUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(VideoUpdateComponent);
      comp = fixture.componentInstance;
      const courseEntity = new Course('1', 'a');
      comp.courses = [courseEntity];
      const chapterEntity = new Chapter('1', 'a');
      comp.chapters = [chapterEntity];

      service = fixture.debugElement.injector.get(VideoService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Video('123');
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async
        entity.resources = [];

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new Video();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async
        entity.resources = [];

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
