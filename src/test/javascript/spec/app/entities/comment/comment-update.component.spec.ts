/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { OpenLearnrTestModule } from '../../../test.module';
import { CommentUpdateComponent } from 'app/entities/comment/comment-update.component';
import { CommentService } from 'app/entities/comment/comment.service';
import { Comment } from 'app/shared/model/comment.model';
import { Video } from 'app/shared/model/video.model';

describe('Component Tests', () => {
  describe('Comment Management Update Component', () => {
    let comp: CommentUpdateComponent;
    let fixture: ComponentFixture<CommentUpdateComponent>;
    let service: CommentService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [OpenLearnrTestModule],
        declarations: [CommentUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(CommentUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CommentUpdateComponent);
      comp = fixture.componentInstance;
      const videoEntity = new Video('1', 'name');
      comp.videos = [videoEntity];
      service = fixture.debugElement.injector.get(CommentService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Comment('123');
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new Comment();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
