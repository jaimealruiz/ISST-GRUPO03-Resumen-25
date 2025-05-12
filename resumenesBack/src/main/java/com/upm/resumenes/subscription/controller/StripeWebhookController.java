package com.upm.resumenes.subscription.controller;

import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.stripe.model.checkout.Session;

import com.stripe.model.Event;
import com.stripe.net.Webhook;
import com.upm.resumenes.subscription.model.Subscription;
import com.upm.resumenes.subscription.repository.SubscriptionRepository;

import com.upm.resumenes.user.model.User;
import com.upm.resumenes.user.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/stripe")
@RequiredArgsConstructor
public class StripeWebhookController {

    private final UserRepository userRepository;
    private final SubscriptionRepository subscriptionRepository;

    @Value("${stripe.secret.key}")
    private String stripeSecretKey;

    @Value("${stripe.webhook.secret}")
    private String endpointSecret;

    @PostMapping("/webhook")
    public ResponseEntity<String> handleStripeWebhook(@RequestBody String payload,
                                                      @RequestHeader("Stripe-Signature") String sigHeader) {

        Event event;
        System.err.println("Esto yaqui");
        try {
            event = Webhook.constructEvent(payload, sigHeader, endpointSecret);
        } catch (Exception e) {
            return ResponseEntity.status(400).body("Webhook inválido: " + e.getMessage());
        }

        if ("checkout.session.completed".equals(event.getType())) {
            Session session = (Session) event.getDataObjectDeserializer().getObject().orElse(null);
            if (session == null) {
                return ResponseEntity.status(400).body("Sesión vacía");
            }

            String email = session.getCustomerEmail();
            if (email == null) {
                return ResponseEntity.status(400).body("Email no encontrado");
            }

            User user = userRepository.findByEmail(email)
                    .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

            LocalDate now = LocalDate.now();
            LocalDate newEndDate = now.plusMonths(1);

            if (user.getSubscription() != null) {
                user.getSubscription().setEndDate(newEndDate);
            } else {
                Subscription sub = new Subscription();
                sub.setStartDate(now);
                sub.setEndDate(newEndDate);
                sub.setUser(user);
                subscriptionRepository.save(sub);
                user.setSubscription(sub);
            }

            userRepository.save(user);
        }

        return ResponseEntity.ok("Webhook procesado");
    }
}
