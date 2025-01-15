package com.mediawrangler.media_wrangler.data;

import com.mediawrangler.media_wrangler.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface UserRepository extends JpaRepository<User, Integer> {
    boolean existsByEmail(String email);
    boolean existsByUsername(String username);
    User findByUsername(String username);

    @Query("SELECT u FROM User u WHERE u.verificationToken = :token")
    User findByVerificationToken(@Param("token") String token);
}

