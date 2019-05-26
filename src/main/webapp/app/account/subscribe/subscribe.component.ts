import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { SERVER_API_URL } from 'app/app.constants';
import { StripeScriptTag, StripeSource, StripeToken } from 'stripe-angular';

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

    extraData = {
        address_city: null,
        address_line1: null,
        address_state: null,
        address_zip: null
    };

    constructor(private http: HttpClient, private stripeScriptTag: StripeScriptTag) {}

    getStyles(): any {
        return {
            style: {
                base: {
                    fontSize: '16px'
                }
            }
        };
    }

    ngOnInit(): void {
        this.stripeLoaded = false;
        this.stripeScriptTag
            .setPublishableKey(this.publishableKey)
            .then(() => (this.stripeLoaded = true))
            .catch(error => {
                console.error(error);
            });
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
}
