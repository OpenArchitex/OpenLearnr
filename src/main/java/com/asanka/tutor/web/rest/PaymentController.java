package com.asanka.tutor.web.rest;

import com.asanka.tutor.domain.User;
import com.asanka.tutor.security.StripeClient;
import com.asanka.tutor.security.UserNotLoggedInException;
import com.asanka.tutor.service.UserService;
import com.codahale.metrics.annotation.Timed;
import com.stripe.model.Charge;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.configurationprocessor.json.JSONArray;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class PaymentController {

    private StripeClient stripeClient;

    private final UserService userService;

    private final Logger log = LoggerFactory.getLogger(PaymentController.class);

    @Autowired
    PaymentController(StripeClient stripeClient, UserService userService) {
        this.stripeClient = stripeClient;
        this.userService = userService;
    }

    @PostMapping("/payment")
    @Timed
    public Charge chargeCard(HttpServletRequest request) throws Exception {
        String token = request.getHeader("token");
        JSONArray chapterIDs = new JSONArray(request.getHeader("chapters"));
        List<String> chapters = new ArrayList<>();
        int length = chapterIDs.length();
        for (int i = 0; i < length; i++){
            chapters.add(chapterIDs.get(i).toString());
        }
        Optional<User> user = userService.getUserWithAuthorities();
        if (!user.isPresent()) {
            log.error("User is not logged in!");
            throw new UserNotLoggedInException("User not logged in!");
        }
        userService.updateUserSubscriptions(userService.getUserWithAuthorities().get().getId(), chapters);
        return this.stripeClient.chargeCreditCard(token, stripeClient.getStripeUnitPrice() * length);
    }

    /**
     * GET  /publickey : get Stripe public key.
     *
     * @return the ResponseEntity with status 200 (OK) and with body the Stripe public key.
     */
    @GetMapping("/payment")
    @Timed
    public ResponseEntity<String> getStripePublicKey() {
        log.debug("REST request to get Stripe public key");
        Optional<String> publicKey = Optional.of(stripeClient.getStripePublicKey());
        return ResponseUtil.wrapOrNotFound(publicKey);
    }
}
