package com.upm.resumenes.subscription.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.upm.resumenes.subscription.model.Subscription;
import com.upm.resumenes.user.model.User;

public interface SubscriptionRepository extends JpaRepository<Subscription, Long> {
    Optional<Subscription> findByUser(User user);
}
