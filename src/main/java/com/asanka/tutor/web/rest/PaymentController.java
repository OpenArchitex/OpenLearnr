package com.asanka.tutor.web.rest;

import com.asanka.tutor.security.StripeClient;
import com.asanka.tutor.service.UserService;
import com.codahale.metrics.annotation.Timed;
import com.stripe.model.Charge;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.configurationprocessor.json.JSONArray;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api")
public class PaymentController {

    private StripeClient stripeClient;

    private final UserService userService;

    @Autowired
    PaymentController(StripeClient stripeClient, UserService userService) {
        this.stripeClient = stripeClient;
        this.userService = userService;
    }

    @PostMapping("/payment")
    @Timed
    public Charge chargeCard(HttpServletRequest request) throws Exception {
        String token = request.getHeader("token");
        double amount = Double.parseDouble(request.getHeader("amount"));
        String userID = request.getHeader("userID");
        JSONArray chapterIDs = new JSONArray(request.getHeader("chapters"));
        List<String> chapters = new ArrayList<>();
        int length = chapterIDs.length();
        for (int i = 0; i < length; i++){
            chapters.add(chapterIDs.get(i).toString());
        }
        userService.updateUserSubscriptions(userID, chapters);
        return this.stripeClient.chargeCreditCard(token, amount);
    }
}
