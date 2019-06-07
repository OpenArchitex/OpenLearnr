import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material';
import { JhiAlertService } from 'ng-jhipster';

@Component({
    selector: 'jhi-email',
    templateUrl: './email.component.html',
    styleUrls: ['./email.scss']
})
export class EmailComponent implements OnInit {
    contactForm = this.fb.group({
        contactName: ['', Validators.required],
        contactEmail: ['', [Validators.required, Validators.email]],
        contactPhone: [''],
        contactMsg: ['', Validators.required]
    });

    get contactName() {
        return this.contactForm.get('contactName');
    }

    get contactEmail() {
        return this.contactForm.get('contactEmail');
    }

    get contactPhone() {
        return this.contactForm.get('contactPhone');
    }

    get contactMsg() {
        return this.contactForm.get('contactMsg');
    }

    onSubmit() {
        this.sendRequest().subscribe(
            () => {
                this._snackBar.open('Thanks for writing to us! We will get back to you soon!', null, {
                    duration: 5000,
                    panelClass: ['contact-form-snack-bar']
                });
                this.contactForm.reset();
            },
            err => {
                this.onError(err.message);
            }
        );
    }

    sendRequest(): Observable<any> {
        return this.http.post<any>('https://usebasin.com/f/b5ed73d03aa5', this.contactForm.value, {
            headers: new HttpHeaders({
                Accept: 'application/json'
            }),
            observe: 'response'
        });
    }

    constructor(
        private fb: FormBuilder,
        private http: HttpClient,
        private _snackBar: MatSnackBar,
        private jhiAlertService: JhiAlertService
    ) {}

    ngOnInit() {}

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
