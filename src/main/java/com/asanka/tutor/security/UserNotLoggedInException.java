package com.asanka.tutor.security;

import org.springframework.security.core.AuthenticationException;

/**
 * This exception is thrown in case of a not logged in user trying to access resources.
 */
public class UserNotLoggedInException extends AuthenticationException {

    private static final long serialVersionUID = 1L;

    public UserNotLoggedInException(String message) {
        super(message);
    }

    public UserNotLoggedInException(String message, Throwable t) {
        super(message, t);
    }
}
