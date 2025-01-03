package com.mediawrangler.media_wrangler.controllers;

import com.mediawrangler.media_wrangler.dto.LoginRequest;
import com.mediawrangler.media_wrangler.dto.RegisterRequest;
import com.mediawrangler.media_wrangler.models.User;
import com.mediawrangler.media_wrangler.services.UserService;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.*;
import com.mediawrangler.media_wrangler.data.UserRepository;

import java.util.HashMap;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
@RestController
@RequestMapping("/users")
public class UserController {

    private final UserService userService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody User user, Errors errors) {
        if (errors.hasErrors()) {
            Map<String, String> validationErrors = new HashMap<>();
            errors.getFieldErrors().forEach(error ->
                    validationErrors.put(error.getField(), error.getDefaultMessage())
            );
            return new ResponseEntity<>(validationErrors, HttpStatus.BAD_REQUEST);
        }

        try {
            User savedUser = userService.saveUser(user);
            return new ResponseEntity<>("User registered successfully. Please verify your email.", HttpStatus.CREATED);
        } catch (DataIntegrityViolationException e) {
            if (e.getMessage().contains("users.UK_username")) {
                return new ResponseEntity<>(Map.of("username", "Username is already taken"), HttpStatus.BAD_REQUEST);
            } else if (e.getMessage().contains("users.UK_email")) {
                return new ResponseEntity<>(Map.of("email", "Email is already registered"), HttpStatus.BAD_REQUEST);
            }
            return new ResponseEntity<>(Map.of("error", "An unexpected error occurred"), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginRequest loginRequest, HttpSession session) {
        User user = userRepository.findByUsername(loginRequest.getUsername());
        if (user != null && passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
            session.setAttribute("user", user.getId());

            Map<String, Object> response = new HashMap<>();
            response.put("id", user.getId());
            response.put("username", user.getUsername());
            response.put("firstname", user.getFirstname());
            response.put("lastname", user.getLastname());

            return new ResponseEntity<>(response, HttpStatus.OK);
        }
        return new ResponseEntity<>("Invalid username or password", HttpStatus.UNAUTHORIZED);
    }

    @GetMapping("/info")
    public ResponseEntity<?> loginUser( HttpSession session) {
        System.out.println(session.getAttribute("user"));
        int userId = (int) session.getAttribute("user");
        User user = userRepository.getById(userId);

        return new ResponseEntity<>("User: " + user.getEmail(), HttpStatus.OK);
    }

}

    @GetMapping("/profile/{userId}")
    public ResponseEntity<User> getUserById(@PathVariable int userId) {
        return userRepository.findById(userId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

}

