package com.asanka.tutor.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

/**
 * Properties specific to Online Tutor.
 * <p>
 * Properties are configured in the {@code application.yml} file.
 * See {@link io.github.jhipster.config.JHipsterProperties} for a good example.
 */
@ConfigurationProperties(prefix = "application", ignoreUnknownFields = false)
public class ApplicationProperties {
    public final Stripe stripe = new Stripe();

    public Stripe getStripe() {
        return stripe;
    }

    public static class Stripe {
        private String publicKey;
        private String privateKey;
        private double unitPrice;

        public String getPublicKey() {
            return publicKey;
        }

        public void setPublicKey(String publicKey) {
            this.publicKey = publicKey;
        }

        public String getPrivateKey() {
            return privateKey;
        }

        public void setPrivateKey(String privateKey) {
            this.privateKey = privateKey;
        }

        public double getUnitPrice() { return unitPrice; }

        public void setUnitPrice(double unitPrice) { this.unitPrice = unitPrice; }
    }
}
