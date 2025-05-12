package com.upm.resumenes.subscription.controller;

import java.time.LocalDate;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.upm.resumenes.subscription.dto.SubscriptionStatusResponse;
import com.upm.resumenes.subscription.model.Subscription;
import com.upm.resumenes.subscription.repository.SubscriptionRepository;
import com.upm.resumenes.subscription.service.SubscriptionService;
import com.upm.resumenes.user.model.User;
import com.upm.resumenes.user.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/subscription")
@RequiredArgsConstructor
public class SubscriptionController {

    private final UserRepository userRepository;
    private final SubscriptionRepository subscriptionRepository;

    private final SubscriptionService subscriptionService;

    @PostMapping("/checkout")
    public ResponseEntity<Map<String, String>> checkout(@AuthenticationPrincipal UserDetails userDetails) {
        try {
            String url = subscriptionService.createCheckoutSession(userDetails.getUsername());
            return ResponseEntity.ok(Map.of("url", url));
        } catch (Exception e) {
            return ResponseEntity
                    .badRequest()
                    .body(Map.of("error", "Error al crear sesión de pago: " + e.getMessage()));
        }
    }

    @PostMapping("/cancel")
    public ResponseEntity<?> cancelSubscription(@AuthenticationPrincipal UserDetails userDetails) {
        User user = userRepository.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        Subscription subscription = user.getSubscription();

        if (subscription == null) {
            return ResponseEntity.badRequest().body("No tienes una suscripción activa.");
        }

        if (subscription.getEndDate().isAfter(LocalDate.now())) {
            // SI no?
            subscription.setEndDate(LocalDate.now());
            subscriptionRepository.save(subscription);
        }

        return ResponseEntity.ok(new SubscriptionStatusResponse(false, subscription.getEndDate()));
    }

    @GetMapping("/status")
    public ResponseEntity<?> getSubscriptionStatus(@AuthenticationPrincipal UserDetails userDetails) {
        User user = userRepository.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        Subscription subscription = user.getSubscription();

        if (subscription == null || !subscription.getEndDate().isAfter(LocalDate.now())) {
            return ResponseEntity.ok(new SubscriptionStatusResponse(false, null));
        }

        return ResponseEntity.ok(new SubscriptionStatusResponse(true, subscription.getEndDate()));
    }

}
