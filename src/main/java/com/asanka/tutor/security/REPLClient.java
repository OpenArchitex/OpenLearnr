package com.asanka.tutor.security;

import com.asanka.tutor.config.ApplicationProperties;
import org.springframework.stereotype.Component;

@Component
public class REPLClient {
    private final ApplicationProperties.REPL repl;

    public REPLClient(ApplicationProperties applicationProperties){
        repl = applicationProperties.getRepl();
    }

    public String getREPLUrl() {
        return repl.getUrl();
    }

}
