package com.example.BACKEND.repository;

import com.example.BACKEND.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    
    User findByEmail(String email);
    User findByUsername(String username);
    User findByEmailOrUsername(String email, String username);
    
    boolean existsByEmail(String email);

    // Check if username exists
    boolean existsByUsername(String username);

    
     boolean existsByEmailOrUsername(String email, String username);
}