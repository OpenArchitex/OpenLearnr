import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { SERVER_API_URL } from 'app/app.constants';
import { StripeScriptTag, StripeSource, StripeToken } from 'stripe-angular';
import { IChapter } from 'app/shared/model/chapter.model';
import { ChapterService } from 'app/entities/chapter';
import { ICourse } from 'app/shared/model/course.model';
import { CourseService } from 'app/entities/course';
import { JhiAlertService } from 'ng-jhipster';

@Component({
    selector: 'jhi-subscribe',
    templateUrl: './subscribe.component.html',
    styleUrls: ['subscribe.scss']
})
export class SubscribeComponent implements OnInit {
    private publishableKey = 'pk_test_OuesRgExP1r5SdQx8UBHTX9F00psUFNr6O';

    private executingPayment: boolean;
    private stripeLoaded: boolean;
    private stripeError: string;
    private stripeSuccess: string;
    private chapters: IChapter[];
    private courses: ICourse[];
    private totalCost: number;

    extraData = {
        address_city: null,
        address_line1: null,
        address_state: null,
        address_zip: null
    };

    constructor(
        private http: HttpClient,
        private stripeScriptTag: StripeScriptTag,
        private chapterService: ChapterService,
        private courseService: CourseService,
        private jhiAlertService: JhiAlertService
    ) {}

    ngOnInit(): void {
        this.stripeLoaded = false;
        this.stripeScriptTag
            .setPublishableKey(this.publishableKey)
            .then(() => (this.stripeLoaded = true))
            .catch(error => {
                console.error(error);
            });
        this.loadAllCourses();
    }

    loadAllCourses() {
        this.courseService.query().subscribe(
            (res: HttpResponse<ICourse[]>) => {
                this.courses = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    loadAllChaptersForCourse(courseID: string) {
        this.chapterService.getChaptersForCourse(courseID).subscribe(
            (res: HttpResponse<IChapter[]>) => {
                this.chapters = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    getStyles(): any {
        return {
            style: {
                base: {
                    fontSize: '16px'
                }
            }
        };
    }

    chargeCard(token: string) {
        const headers = new HttpHeaders({ token, amount: '100' });
        this.executingPayment = true;
        this.http.post(SERVER_API_URL + 'api/payment', {}, { headers }).subscribe(
            () => {
                this.stripeSuccess = 'Payment Successful!';
                this.stripeError = null;
                this.executingPayment = false;
            },
            (err: HttpErrorResponse) => {
                this.stripeError = err.error.detail;
                this.stripeSuccess = null;
                this.executingPayment = false;
            }
        );
    }

    onStripeInvalid(error: Error) {
        console.log(error);
    }

    setStripeToken(token: StripeToken) {
        this.chargeCard(token.id);
    }

    setStripeSource(source: StripeSource) {
        console.log('Stripe source', source);
    }

    onStripeError(error: Error) {
        console.error('Stripe error', error);
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    updateTotalCost(value: string[]) {
        this.totalCost = 10 * value.length;
    }
}
