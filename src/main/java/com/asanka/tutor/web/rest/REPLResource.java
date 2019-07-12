package com.asanka.tutor.web.rest;

import com.asanka.tutor.security.REPLClient;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequestMapping("/api")
public class REPLResource {
    private REPLClient replClient;
    private final Logger log = LoggerFactory.getLogger(REPLResource.class);

    @Autowired
    public REPLResource(REPLClient replClient) {
        this.replClient = replClient;
    }

    @GetMapping("/replPad")
    public ResponseEntity<String> chargeCard() {
        log.debug("REST request to get REPL Url");
        Optional<String> url = Optional.of(replClient.getREPLUrl());
        return ResponseUtil.wrapOrNotFound(url);
    }
}
