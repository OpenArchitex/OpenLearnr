/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { OnlineTutorTestModule } from '../../../test.module';
import { StudentComponent } from 'app/entities/student/student.component';
import { StudentService } from 'app/entities/student/student.service';
import { Student } from 'app/shared/model/student.model';

describe('Component Tests', () => {
    describe('Student Management Component', () => {
        let comp: StudentComponent;
        let fixture: ComponentFixture<StudentComponent>;
        let service: StudentService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [OnlineTutorTestModule],
                declarations: [StudentComponent],
                providers: []
            })
                .overrideTemplate(StudentComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(StudentComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(StudentService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Student('123')],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.students[0]).toEqual(jasmine.objectContaining({ id: '123' }));
        });
    });
});
