import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IComment } from 'app/shared/model/comment.model';
import { AccountService } from 'app/core';
import { CommentService } from './comment.service';
import { ICommentReply } from 'app/shared/model/comment-reply.model';

@Component({
  selector: 'jhi-comment',
  templateUrl: './comment.component.html'
})
export class CommentComponent implements OnInit, OnDestroy {
  comments: IComment[];
  currentAccount: any;
  eventSubscriber: Subscription;
  isSaving: boolean;

  constructor(
    protected commentService: CommentService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.commentService
      .query()
      .pipe(
        filter((res: HttpResponse<IComment[]>) => res.ok),
        map((res: HttpResponse<IComment[]>) => res.body)
      )
      .subscribe(
        (res: IComment[]) => {
          this.comments = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInComments();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IComment) {
    return item.id;
  }

  registerChangeInComments() {
    this.eventSubscriber = this.eventManager.subscribe('commentListModification', () => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  commentAndAllReplies(comment: IComment): { commentBody: string; index: number; approved: boolean }[] {
    const commentAndReplies: { commentBody: string; index: number; approved: boolean }[] = [];
    commentAndReplies.push({ commentBody: comment.commentBody, index: -1, approved: comment.isApproved });
    if (comment.replies !== undefined && comment.replies !== null) {
      for (const index of Object.keys(comment.replies)) {
        const reply: ICommentReply = comment.replies[index];
        commentAndReplies.push({ commentBody: reply.replyBody, index: +index, approved: reply.approved });
      }
    }
    return commentAndReplies;
  }

  approveComment(comment: IComment) {
    this.subscribeToSaveResponse(this.commentService.update(comment));
  }

  resetComment() {
    this.loadAll();
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IComment>>) {
    result.subscribe();
  }

  changeToApprove(comment: IComment, commentOrReply: { commentBody: string; index: number; approved: boolean }) {
    const index = commentOrReply.index;
    if (!commentOrReply.approved) {
      const filteredComment: IComment = this.comments.filter(comm => {
        return comm.id === comment.id;
      })[0];

      if (index === -1) {
        filteredComment.isApproved = true;
      } else {
        filteredComment.replies[index].approved = true;
      }
    } else {
      const filteredComment: IComment = this.comments.filter(comm => {
        return comm.id === comment.id;
      })[0];

      if (index === -1) {
        filteredComment.isApproved = false;
      } else {
        filteredComment.replies[index].approved = false;
      }
    }
  }
}
