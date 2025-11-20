package com.example.BACKEND.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.BACKEND.model.Feedback;

public interface FeedbackRepository extends JpaRepository<Feedback, Long> {

}