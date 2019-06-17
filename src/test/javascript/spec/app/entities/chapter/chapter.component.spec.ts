/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { OnlineTutorTestModule } from '../../../test.module';
import { ChapterComponent } from 'app/entities/chapter/chapter.component';
import { ChapterService } from 'app/entities/chapter/chapter.service';
import { Chapter } from 'app/shared/model/chapter.model';

describe('Component Tests', () => {
    describe('Chapter Management Component', () => {
        let comp: ChapterComponent;
        let fixture: ComponentFixture<ChapterComponent>;
        let service: ChapterService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [OnlineTutorTestModule],
                declarations: [ChapterComponent],
                providers: []
            })
                .overrideTemplate(ChapterComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ChapterComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ChapterService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Chapter('123')],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.chapters[0]).toEqual(jasmine.objectContaining({ id: '123' }));
        });
    });
});
