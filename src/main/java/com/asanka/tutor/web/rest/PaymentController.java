package com.asanka.tutor.web.rest;

import com.asanka.tutor.domain.User;
import com.asanka.tutor.repository.CustomAuditEventRepository;
import com.asanka.tutor.security.StripeClient;
import com.asanka.tutor.security.UserNotLoggedInException;
import com.asanka.tutor.service.UserService;
import com.asanka.tutor.web.rest.errors.StripeCardError;
import com.stripe.exception.CardException;
import com.stripe.model.Charge;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.actuate.audit.AuditEvent;
import org.springframework.boot.configurationprocessor.json.JSONArray;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.*;

@RestController
@RequestMapping("/api")
public class PaymentController {

    private StripeClient stripeClient;

    private final UserService userService;
    
    private CustomAuditEventRepository customAuditEventRepository;

    private final Logger log = LoggerFactory.getLogger(PaymentController.class);

    @Autowired
    PaymentController(StripeClient stripeClient, UserService userService, CustomAuditEventRepository customAuditEventRepository) {
        this.stripeClient = stripeClient;
        this.userService = userService;
        this.customAuditEventRepository = customAuditEventRepository;
    }

    @PostMapping("/payment")
    public Charge chargeCard(HttpServletRequest request) throws Exception {
        String token = request.getHeader("token");
        JSONArray chapterIDs = new JSONArray(request.getHeader("chapters"));
        List<String> chapters = new ArrayList<>();
        int length = chapterIDs.length();
        Optional<User> user = userService.getUserWithAuthorities();
        if (!user.isPresent()) {
            log.error("User is not logged in!");
            throw new UserNotLoggedInException("User not logged in!");
        }
        Charge charge;
        AuditEvent event = null;
        Map<String, Object> data = new HashMap<>();
        data.put("message", chapterIDs.toString());
        try {
            // TODO: Change user friendliness
            charge = this.stripeClient.chargeCreditCard(token, stripeClient.getStripeUnitPrice() * length);
            event = new AuditEvent(user.get().getLogin(), "PAYMENT_SUCCESSFUL", data);
        } catch (CardException e) {
            // TODO: Change user friendliness
            event = new AuditEvent(user.get().getLogin(), "PAYMENT_FAILURE", data);
            throw new StripeCardError(e.getMessage());
        } finally {
            customAuditEventRepository.add(event);
        }
        for (int i = 0; i < length; i++){
            chapters.add(chapterIDs.get(i).toString());
        }
        userService.updateUserSubscriptions(user.get().getId(), chapters);
        return charge;
    }

    /**
     * GET  /publickey : get Stripe public key.
     *
     * @return the ResponseEntity with status 200 (OK) and with body the Stripe public key.
     */
    @GetMapping("/payment")
    public ResponseEntity<String> getStripePublicKey() {
        log.debug("REST request to get Stripe public key");
        Optional<String> publicKey = Optional.of(stripeClient.getStripePublicKey());
        return ResponseUtil.wrapOrNotFound(publicKey);
    }
}
