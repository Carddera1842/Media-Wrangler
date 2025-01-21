package com.mediawrangler.media_wrangler.data;

import com.mediawrangler.media_wrangler.models.Answer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AnswerRepository extends JpaRepository<Answer, Long> {
}
