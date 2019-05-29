import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICourse } from 'app/shared/model/course.model';
import { IVideo } from 'app/shared/model/video.model';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { JhiAlertService } from 'ng-jhipster';
import { IChapter } from 'app/shared/model/chapter.model';
import { ChapterService } from 'app/entities/chapter';
import { CourseService } from 'app/entities/course/course.service';

interface NavItem {
    chapterName: string;
    videos?: IVideo[];
}

@Component({
    selector: 'jhi-course-detail',
    templateUrl: './course-detail.component.html',
    styleUrls: ['course.scss']
})
export class CourseDetailComponent implements OnInit {
    course: ICourse;
    chapters: IChapter[];
    videos: IVideo[];
    clickedVideo: IVideo;
    navItems: NavItem[] = [];

    static previousState() {
        window.history.back();
    }

    constructor(
        private activatedRoute: ActivatedRoute,
        private chapterService: ChapterService,
        private courseService: CourseService,
        private jhiAlertService: JhiAlertService
    ) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ course }) => {
            this.course = course;
            this.loadAllChaptersForCourse(course);
        });
    }

    loadAllChaptersForCourse(course: ICourse) {
        this.chapterService.getChaptersForCourse(course.id).subscribe(
            (res: HttpResponse<IChapter[]>) => {
                this.chapters = res.body.sort((a, b) => {
                    if (a.chapterNumber < b.chapterNumber) {
                        return -1;
                    } else if (a.chapterNumber > b.chapterNumber) {
                        return 1;
                    }
                    return 0;
                });
                this.constructNavItemsArray();
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    private constructNavItemsArray() {
        for (const chapter of this.chapters) {
            this.loadAllVideosForChapter(chapter);
        }
    }

    loadAllVideosForChapter(chapter: IChapter) {
        this.chapterService.getVideosForChapter(chapter.id).subscribe(
            (res: HttpResponse<IVideo[]>) => {
                this.clickedVideo = res.body[0];
                this.navItems.push({ chapterName: chapter.name, videos: res.body });
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
