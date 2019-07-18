/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { OpenLearnrTestModule } from '../../../test.module';
import { ChapterDetailComponent } from 'app/entities/chapter/chapter-detail.component';
import { Chapter } from 'app/shared/model/chapter.model';

describe('Component Tests', () => {
  describe('Chapter Management Detail Component', () => {
    let comp: ChapterDetailComponent;
    let fixture: ComponentFixture<ChapterDetailComponent>;
    const route = ({ data: of({ chapter: new Chapter('123') }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [OpenLearnrTestModule],
        declarations: [ChapterDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(ChapterDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ChapterDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.chapter).toEqual(jasmine.objectContaining({ id: '123' }));
      });
    });
  });
});
