import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SERVER_API_URL } from 'app/app.constants';
import { StripeScriptTag, StripeSource, StripeToken } from 'stripe-angular';

@Component({
    selector: 'jhi-subscribe',
    templateUrl: './subscribe.component.html',
    styleUrls: ['subscribe.scss']
})
export class SubscribeComponent implements OnInit {
    private publishableKey = 'pk_test_OuesRgExP1r5SdQx8UBHTX9F00psUFNr6O';

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
        this.stripeScriptTag.setPublishableKey(this.publishableKey).catch(error => console.error(error));
    }

    // paymentExecution() {
    //     this.stripeCard.createToken(this.parseExtraDetails()).then(result => this.chargeCard(result.id));
    // }

    chargeCard(token: string) {
        const headers = new HttpHeaders({ token: token, amount: '100' });
        this.http.post(SERVER_API_URL + 'api/payment', {}, { headers: headers }).subscribe(resp => {
            console.log(resp);
        });
    }

    onStripeInvalid(error: Error) {
        console.log('Validation Error', error);
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
