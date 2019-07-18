package com.asanka.tutor.security;

import com.asanka.tutor.config.ApplicationProperties;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.Charge;
import com.stripe.net.ApiResource;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;

@Component
public class StripeClient {
    private final ApplicationProperties.Stripe stripe;

    public StripeClient(ApplicationProperties applicationProperties){
        stripe = applicationProperties.getStripe();
        Stripe.apiKey = stripe.getPrivateKey();
    }

    public Charge chargeCreditCard(String token, double amount) throws StripeException {
        Map<String, Object> chargeParams = new HashMap<>();
        chargeParams.put("amount", (int)(amount * 100));
        chargeParams.put("currency", "USD");
        chargeParams.put("source", token);
        return ApiResource.GSON.fromJson(Charge.create(chargeParams).getLastResponse().body(), Charge.class);
    }

    public String getStripePublicKey() {
        return stripe.getPublicKey();
    }

    public double getStripeUnitPrice() {
        return stripe.getUnitPrice();
    }
}
