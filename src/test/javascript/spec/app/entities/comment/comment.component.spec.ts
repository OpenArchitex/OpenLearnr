/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { OpenLearnrTestModule } from '../../../test.module';
import { CommentComponent } from 'app/entities/comment/comment.component';
import { CommentService } from 'app/entities/comment/comment.service';
import { Comment, IComment } from 'app/shared/model/comment.model';

describe('Component Tests', () => {
  describe('Comment Management Component', () => {
    let comp: CommentComponent;
    let fixture: ComponentFixture<CommentComponent>;
    let service: CommentService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [OpenLearnrTestModule],
        declarations: [CommentComponent],
        providers: []
      })
        .overrideTemplate(CommentComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CommentComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CommentService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Comment('123')],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.comments[0]).toEqual(jasmine.objectContaining({ id: '123' }));
    });

    it('Should call commentAndAllReplies', () => {
      // GIVEN
      const comment: IComment = {
        commentBody: 'Test Comment',
        replies: [
          { replyBody: 'Test Reply', isAdminReply: true, createdBy: 'Sudharaka', createdDate: new Date(), dislikesCount: 0, approved: true }
        ],
        likesCount: 0,
        dislikesCount: 0,
        isApproved: true,
        isAdminComment: false,
        createdBy: 'Sudharaka',
        createdDate: new Date(),
        lastModifiedBy: 'Asanka',
        lastModifiedDate: new Date()
      };

      // THEN
      expect(comp.commentAndAllReplies(comment)).toEqual([
        { commentBody: 'Test Comment', index: -1, approved: true },
        { commentBody: 'Test Reply', index: 0, approved: true }
      ]);
    });

    it('Should call changeToApprove', () => {
      // GIVEN
      const commentNotApproved: IComment = {
        id: '123',
        commentBody: 'Test Comment Not Approved',
        replies: [
          {
            replyBody: 'Test Reply Not Approved',
            isAdminReply: true,
            createdBy: 'Sudharaka',
            createdDate: new Date(),
            dislikesCount: 0,
            approved: false
          }
        ],
        likesCount: 0,
        dislikesCount: 0,
        isApproved: false,
        isAdminComment: false
      };

      const commentApproved: IComment = {
        id: '456',
        commentBody: 'Test Comment Approved',
        replies: [
          {
            replyBody: 'Test Reply Approved',
            isAdminReply: true,
            createdBy: 'Sudharaka',
            createdDate: new Date(),
            dislikesCount: 0,
            approved: true
          }
        ],
        likesCount: 0,
        dislikesCount: 0,
        isApproved: true,
        isAdminComment: false,
        createdBy: 'Sudharaka',
        createdDate: new Date(),
        lastModifiedBy: 'Asanka',
        lastModifiedDate: new Date()
      };

      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [commentNotApproved, commentApproved],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();
      comp.changeToApprove(commentNotApproved, { commentBody: 'Test Comment Not Approved', index: -1, approved: false });
      comp.changeToApprove(commentNotApproved, { commentBody: 'Test Reply Not Approved', index: 0, approved: false });
      comp.changeToApprove(commentApproved, { commentBody: 'Test Comment Approved', index: -1, approved: true });
      comp.changeToApprove(commentApproved, { commentBody: 'Test Reply Approved', index: 0, approved: true });

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.comments[0].isApproved).toEqual(true);
      expect(comp.comments[0].replies[0].approved).toEqual(true);
      expect(comp.comments[1].isApproved).toEqual(false);
      expect(comp.comments[1].replies[0].approved).toEqual(false);
    });
  });
});
