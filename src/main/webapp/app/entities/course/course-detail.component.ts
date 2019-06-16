import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICourse } from 'app/shared/model/course.model';
import { IVideo } from 'app/shared/model/video.model';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { JhiAlertService } from 'ng-jhipster';
import { IChapter } from 'app/shared/model/chapter.model';
import { ChapterService } from 'app/entities/chapter';
import { CourseService } from 'app/entities/course/course.service';
import { MediaMatcher } from '@angular/cdk/layout';
import { IComment } from 'app/shared/model/comment.model';
import { CommentService } from 'app/entities/comment';
import { MatSnackBar } from '@angular/material';
import { NgForm } from '@angular/forms';
import { Principal } from 'app/core';

interface NavItem {
    chapterName: string;
    chapterNumber: number;
    videos?: IVideo[];
}

@Component({
    selector: 'jhi-course-detail',
    templateUrl: './course-detail.component.html',
    styleUrls: ['course.scss']
})
export class CourseDetailComponent implements OnInit, OnDestroy {
    course: ICourse;
    chapters: IChapter[];
    clickedVideo: IVideo;
    comments: IComment[];
    navItems: NavItem[];
    mobileQuery: MediaQueryList;
    _mobileQueryListener: () => void;
    comment: IComment;
    isSaving: boolean;

    static previousState() {
        window.history.back();
    }

    constructor(
        private activatedRoute: ActivatedRoute,
        private chapterService: ChapterService,
        private courseService: CourseService,
        private commentsService: CommentService,
        private jhiAlertService: JhiAlertService,
        private changeDetectorRef: ChangeDetectorRef,
        private _snackBar: MatSnackBar,
        private media: MediaMatcher,
        private principal: Principal
    ) {
        this.mobileQuery = media.matchMedia('(max-width: 600px)');
        this._mobileQueryListener = () => changeDetectorRef.detectChanges();
        this.mobileQuery.addListener(this._mobileQueryListener);
    }

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ course }) => {
            this.course = course;
            this.navItems = [];
            this.comments = [];
            this.comment = { isApproved: false };
            this.clickedVideo = null;
            this.isSaving = false;
            this.loadAllChaptersForCourse(course);
        });
    }

    ngOnDestroy(): void {
        this.mobileQuery.removeListener(this._mobileQueryListener);
    }

    loadAllChaptersForCourse(course: ICourse) {
        this.chapterService.getChaptersForCourse(course.id).subscribe(
            (res: HttpResponse<IChapter[]>) => {
                this.chapters = res.body;
                this.constructNavItemsArray();
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    private constructNavItemsArray() {
        const chapterIDs: string[] = [];
        for (const chapter of this.chapters) {
            chapterIDs.push(chapter.id);
        }
        this.chapterService.getVideosForChapters(chapterIDs).subscribe(
            (res: HttpResponse<IVideo[]>) => {
                for (const chapter of this.chapters) {
                    this.navItems.push({
                        chapterName: chapter.name,
                        chapterNumber: chapter.chapterNumber,
                        videos: res.body.filter(video => video.chapterID === chapter.id).sort((a, b) => a.episode - b.episode)
                    });
                }
                this.navItems.sort((a, b) => a.chapterNumber - b.chapterNumber);
                this.clickedVideo = this.navItems[0].videos[0];
            },
            (res: HttpErrorResponse) => this.onError(res.message),
            () => this.getCommentsForVideo(this.clickedVideo)
        );
    }

    public getCommentsForVideo(clickedVideo: IVideo) {
        this.commentsService.getCommentsForVideo(clickedVideo.id).subscribe(
            (res: HttpResponse<IComment[]>) => {
                this.comments = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    private incrementLikesCount(comment: IComment) {
        comment.likesCount++;
    }

    public profilePicURL(name?: string): string {
        if (name) {
            return `https://avatars.dicebear.com/v2/avataaars/${name}.svg?options[style][]=circle&options[mouth][]=smile`;
        } else {
            return `https://avatars.dicebear.com/v2/avataaars/PythonSinhala.svg?options[style][]=circle&options[mouth][]=smile`;
        }
    }

    public saveComment(form: NgForm) {
        this.isSaving = true;
        this.comment.videoID = this.clickedVideo.id;
        this.commentsService.create(this.comment).subscribe(
            () => {
                this.isSaving = false;
                this._snackBar.open('Thanks for your comment. We will review and publish it soon!', null, {
                    duration: 5000,
                    panelClass: ['login-snack-bar']
                });
                form.reset();
            },
            (res: HttpErrorResponse) => {
                this.onError(res.message);
                this.isSaving = false;
            }
        );
    }

    public isAuthenticated() {
        return this.principal.isAuthenticated();
    }
}
