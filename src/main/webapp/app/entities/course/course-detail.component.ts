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
        private media: MediaMatcher
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
            this.clickedVideo = null;
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
                        videos: res.body.filter(video => video.chapterID === chapter.id)
                    });
                }
                this.navItems.sort((a, b) => a.chapterNumber - b.chapterNumber);
                this.clickedVideo = this.navItems[0].videos[0];
            },
            (res: HttpErrorResponse) => this.onError(res.message),
            () => this.getCommentsForVideo(this.clickedVideo)
        );
    }

    private getCommentsForVideo(clickedVideo: IVideo) {
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
}
