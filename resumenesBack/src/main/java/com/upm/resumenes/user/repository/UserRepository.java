package com.upm.resumenes.user.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.upm.resumenes.user.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
}