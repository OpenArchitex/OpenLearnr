import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IStudent } from 'app/shared/model/student.model';

@Component({
    selector: 'jhi-student-detail',
    templateUrl: './student-detail.component.html'
})
export class StudentDetailComponent implements OnInit {
    student: IStudent;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ student }) => {
            this.student = student;
        });
    }

    previousState() {
        window.history.back();
    }
}
