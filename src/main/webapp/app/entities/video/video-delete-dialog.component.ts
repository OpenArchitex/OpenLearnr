import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IVideo } from 'app/shared/model/video.model';
import { VideoService } from './video.service';

@Component({
  selector: 'jhi-video-delete-dialog',
  templateUrl: './video-delete-dialog.component.html'
})
export class VideoDeleteDialogComponent {
  video: IVideo;

  constructor(protected videoService: VideoService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: string) {
    this.videoService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'videoListModification',
        content: 'Deleted an video'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-video-delete-popup',
  template: ''
})
export class VideoDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ video }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(VideoDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.video = video;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/video', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/video', { outlets: { popup: null } }]);
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
