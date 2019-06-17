/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { OnlineTutorTestModule } from '../../../test.module';
import { ChapterDeleteDialogComponent } from 'app/entities/chapter/chapter-delete-dialog.component';
import { ChapterService } from 'app/entities/chapter/chapter.service';

describe('Component Tests', () => {
    describe('Chapter Management Delete Component', () => {
        let comp: ChapterDeleteDialogComponent;
        let fixture: ComponentFixture<ChapterDeleteDialogComponent>;
        let service: ChapterService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [OnlineTutorTestModule],
                declarations: [ChapterDeleteDialogComponent]
            })
                .overrideTemplate(ChapterDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ChapterDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ChapterService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it(
                'Should call delete service on confirmDelete',
                inject(
                    [],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(of({}));

                        // WHEN
                        comp.confirmDelete('123');
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith('123');
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });
});
