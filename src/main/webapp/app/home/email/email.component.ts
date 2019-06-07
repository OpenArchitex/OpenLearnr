import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';

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
        console.warn(this.contactForm.value);
    }

    constructor(private fb: FormBuilder) {}

    ngOnInit() {}
}
