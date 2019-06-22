package com.asanka.tutor.web.rest.errors;

import org.zalando.problem.AbstractThrowableProblem;
import org.zalando.problem.Status;

public class StripeCardError extends AbstractThrowableProblem {

    private static final long serialVersionUID = 1L;

    public StripeCardError(String stripeError) {
        super(ErrorConstants.STRIPE_ERROR, stripeError, Status.INTERNAL_SERVER_ERROR);
    }
}
