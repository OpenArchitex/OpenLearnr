import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IChapter } from 'app/shared/model/chapter.model';
import { ChapterService } from './chapter.service';

@Component({
  selector: 'jhi-chapter-delete-dialog',
  templateUrl: './chapter-delete-dialog.component.html'
})
export class ChapterDeleteDialogComponent {
  chapter: IChapter;

  constructor(protected chapterService: ChapterService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: string) {
    this.chapterService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'chapterListModification',
        content: 'Deleted an chapter'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-chapter-delete-popup',
  template: ''
})
export class ChapterDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ chapter }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(ChapterDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.chapter = chapter;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/chapter', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/chapter', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          }
        );
      }, 0);
    });
  }

  ngOnDestroy() {
    this.ngbModalRef = null;
  }
}
