package com.example.BACKEND.controller;

import com.example.BACKEND.model.User;
import com.example.BACKEND.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    // SIGN UP
   @PostMapping("/signup")
public ResponseEntity<String> signup(@RequestBody User user) {


   if (!user.getEmail().endsWith("@gmail.com")) {
        return ResponseEntity
                .badRequest()
                .body("Email must be a Gmail address!");
    }
    
    if (userRepository.existsByEmail(user.getEmail())) {
        
        return ResponseEntity
                .badRequest()
                .body("Email already exists!");
    }

    if (userRepository.existsByUsername(user.getUsername())) {
       
        return ResponseEntity
                .badRequest()
                .body("Username already exists!");
    }

    
    userRepository.save(user);
    return ResponseEntity
            .ok("Account created successfully 🎉.");
}
    // LOGIN
    @PostMapping("/login")
    public String login(@RequestBody User user) {

        User dbUser = userRepository.findByEmailOrUsername(user.getEmail(), user.getUsername());
        

        if (dbUser == null) {
            return "User not found!";
        }

        if (!dbUser.getPassword().equals(user.getPassword())) {
            return "Invalid password!";
        }

        return "Login Successful 👍";
    }
}
