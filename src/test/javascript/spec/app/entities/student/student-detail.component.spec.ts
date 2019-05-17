/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { OnlineTutorTestModule } from '../../../test.module';
import { StudentDetailComponent } from 'app/entities/student/student-detail.component';
import { Student } from 'app/shared/model/student.model';

describe('Component Tests', () => {
    describe('Student Management Detail Component', () => {
        let comp: StudentDetailComponent;
        let fixture: ComponentFixture<StudentDetailComponent>;
        const route = ({ data: of({ student: new Student('123') }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [OnlineTutorTestModule],
                declarations: [StudentDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(StudentDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(StudentDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.student).toEqual(jasmine.objectContaining({ id: '123' }));
            });
        });
    });
});
