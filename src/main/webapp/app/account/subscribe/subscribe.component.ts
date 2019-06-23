import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { SERVER_API_URL } from 'app/app.constants';
import { StripeScriptTag, StripeSource, StripeToken } from 'stripe-angular';
import { IChapter } from 'app/shared/model/chapter.model';
import { ChapterService } from 'app/entities/chapter';
import { ICourse } from 'app/shared/model/course.model';
import { CourseService } from 'app/entities/course';
import { JhiAlertService } from 'ng-jhipster';
import { SubscribeService } from 'app/account/subscribe/subscribe.service';
import { STRIPE_ERROR } from 'app/shared';

@Component({
  selector: 'jhi-subscribe',
  templateUrl: './subscribe.component.html',
  styleUrls: ['subscribe.scss']
})
export class SubscribeComponent implements OnInit {
  private publishableKey: string;
  executingPayment: boolean;
  stripeLoaded: boolean;
  stripeError: string;
  stripeSuccess: string;
  chapters: IChapter[];
  courses: ICourse[];
  totalCost: number;
  chapterIDs: string[];
  courseID: string;

  extraData: any = {
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
    private subscribeService: SubscribeService,
    private jhiAlertService: JhiAlertService
  ) {}

  ngOnInit(): void {
    this.stripeLoaded = false;
    this.subscribeService.find().subscribe(
      (res: string) => {
        this.publishableKey = res;
        this.stripeScriptTag
          .setPublishableKey(this.publishableKey)
          .then(() => {
            this.stripeLoaded = true;
          })
          .catch(error => {
            console.error(error);
          });
        this.loadAllCourses();
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
  }

  loadAllCourses() {
    this.courseService.query().subscribe(
      (res: HttpResponse<ICourse[]>) => {
        this.courses = res.body;
      },
      (res: HttpErrorResponse) => {
        this.onError(res.message);
      }
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
    if (this.courseID == null || this.chapterIDs == null) {
      this.stripeError = 'Please select the Course and Chapters to purchase.';
    }
    const headers = new HttpHeaders({ token, chapters: '[' + this.chapterIDs + ']' });
    this.executingPayment = true;
    this.http.post(SERVER_API_URL + 'api/payment', {}, { headers }).subscribe(
      () => {
        this.stripeSuccess = 'Payment Successful!';
        this.stripeError = null;
        this.executingPayment = false;
      },
      (err: HttpErrorResponse) => {
        if (err.status === 417) {
          this.stripeError = err.error.title.split(';')[0];
        } else {
          this.stripeError = err.error.detail;
        }
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
    this.totalCost = 6.5 * value.length;
  }
}
