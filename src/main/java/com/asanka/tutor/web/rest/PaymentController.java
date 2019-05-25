package com.asanka.tutor.web.rest;

import com.asanka.tutor.security.StripeClient;
import com.codahale.metrics.annotation.Timed;
import com.stripe.model.Charge;
import com.stripe.model.Customer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api")
public class PaymentController {

    private StripeClient stripeClient;

    @Autowired
    PaymentController(StripeClient stripeClient) {
        this.stripeClient = stripeClient;
    }

    @PostMapping("/payment")
    @Timed
    public Charge chargeCard(HttpServletRequest request) throws Exception {
        String token = request.getHeader("token");
        double amount = Double.parseDouble(request.getHeader("amount"));
        return this.stripeClient.chargeCreditCard(token, amount);
    }
}
