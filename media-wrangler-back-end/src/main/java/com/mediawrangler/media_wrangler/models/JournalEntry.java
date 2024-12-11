package com.mediawrangler.media_wrangler.models;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

import java.time.LocalDate;

public class JournalEntry {

    @Id
    @GeneratedValue
    private Long id;
    private LocalDate entryDate;
    private String notes;

    // Need user for this
    @ManyToOne
    private User user;

    // Will pull from TMDB
    @ManyToOne
    private Movie movie;
}
