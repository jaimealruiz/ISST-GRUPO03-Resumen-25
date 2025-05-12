package com.upm.resumenes.subscription.service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.stripe.Stripe;
import com.stripe.model.checkout.Session;
import com.upm.resumenes.user.model.User;
import com.upm.resumenes.user.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SubscriptionService {

    private final UserRepository userRepository;

    @Value("${stripe.secret.key}")
    private String stripeSecretKey;

    //@Value("${stripe.success.url}")
    //private String successUrl;

    //@Value("${stripe.cancel.url}")
    //private String cancelUrl;

    public String createCheckoutSession(String email) throws Exception {
        System.err.println(stripeSecretKey);
        Stripe.apiKey = stripeSecretKey;
    
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
    
        if (user.getSubscription() != null &&
            user.getSubscription().getEndDate().isAfter(LocalDate.now())) {
            throw new RuntimeException("Ya tienes una suscripción activa.");
        }
    
        Map<String, Object> params = new HashMap<>();
        params.put("mode", "payment");
        params.put("success_url", "http://resumenes.cat/profile");
        params.put("cancel_url", "http://resumenes.cat");
        params.put("customer_email", user.getEmail());
    
        // Line item con 20 euros (2000 céntimos)
        Map<String, Object> priceData = new HashMap<>();
        priceData.put("currency", "eur");
        priceData.put("unit_amount", 2000); // 20,00 €
        
        Map<String, Object> productData = new HashMap<>();
        productData.put("name", "Suscripción mensual");
        priceData.put("product_data", productData);
    
        Map<String, Object> lineItem = new HashMap<>();
        lineItem.put("price_data", priceData);
        lineItem.put("quantity", 1);
    
        List<Object> lineItems = new ArrayList<>();
        lineItems.add(lineItem);
    
        params.put("line_items", lineItems);
    
        Session session = Session.create(params);
    
        return session.getUrl();
    }
    
}
