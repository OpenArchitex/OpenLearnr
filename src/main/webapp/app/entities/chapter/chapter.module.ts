import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { OnlineTutorSharedModule } from 'app/shared';
import {
    ChapterComponent,
    ChapterDetailComponent,
    ChapterUpdateComponent,
    ChapterDeletePopupComponent,
    ChapterDeleteDialogComponent,
    chapterRoute,
    chapterPopupRoute
} from './';

const ENTITY_STATES = [...chapterRoute, ...chapterPopupRoute];

@NgModule({
    imports: [OnlineTutorSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ChapterComponent,
        ChapterDetailComponent,
        ChapterUpdateComponent,
        ChapterDeleteDialogComponent,
        ChapterDeletePopupComponent
    ],
    entryComponents: [ChapterComponent, ChapterUpdateComponent, ChapterDeleteDialogComponent, ChapterDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class OnlineTutorChapterModule {}
