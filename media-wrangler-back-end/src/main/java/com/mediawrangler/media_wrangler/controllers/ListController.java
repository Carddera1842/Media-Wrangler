package com.mediawrangler.media_wrangler.controllers;

import com.mediawrangler.media_wrangler.data.MovieListRepository;
import com.mediawrangler.media_wrangler.data.UserRepository;
import com.mediawrangler.media_wrangler.models.MovieList;
import com.mediawrangler.media_wrangler.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/lists")
@CrossOrigin(origins = "http://localhost:5173")
public class ListController {

    @Autowired
    private MovieListRepository movieListRepository;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/add-movie")
    public ResponseEntity<String> addMovieToList(@RequestBody Map<String, Object> payload) {
        String listName = (String) payload.get("listName");
        int movieId = (int) payload.get("movieId");
        int userId = (int) payload.get("userId");

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        MovieList movieList = new MovieList();
        movieList.setListName(listName);
        movieList.setMovieId(movieId);
        movieList.setUser(user);

        movieListRepository.save(movieList);
        return ResponseEntity.ok("Movie added to list successfully!");
    }

    @GetMapping("/user-lists")
    public ResponseEntity<?> getUserLists(@RequestParam int userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        List<MovieList> lists = movieListRepository.findByUser(user);


        List<String> uniqueListNames = lists.stream()
                .map(MovieList::getListName)
                .distinct()
                .toList();

        return ResponseEntity.ok(uniqueListNames);
    }

    @PostMapping("/add")
    public ResponseEntity<String> addList(@RequestBody Map<String, Object> payload) {
        int userId = (int) payload.get("userId");
        String listName = (String) payload.get("listName");

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        boolean listExists = movieListRepository.findByUser(user)
                .stream()
                .anyMatch(list -> list.getListName().equalsIgnoreCase(listName));

        if (listExists) {
            return ResponseEntity.badRequest().body("List already exists.");
        }

        MovieList movieList = new MovieList();
        movieList.setUser(user);
        movieList.setListName(listName);

        movieListRepository.save(movieList);
        return ResponseEntity.ok("List created successfully!");
    }

    @GetMapping("/all")
    public List<Map<String, Object>> getAllMovieLists() {
        List<MovieList> movieLists = movieListRepository.findAll();

        return movieLists.stream().map(list -> {
            Map<String, Object> map = new HashMap<>();
            map.put("id", list.getId());
            map.put("movieId", list.getMovieId());
            map.put("listName", list.getListName());

            Map<String, Object> userMap = new HashMap<>();
            userMap.put("id", list.getUser().getId());
            userMap.put("username", list.getUser().getUsername());

            map.put("user", userMap);
            return map;
        }).collect(Collectors.toList());
    }


    @DeleteMapping("/{listId}/movie/{movieId}")
    public ResponseEntity<String> deleteMovieFromList(@PathVariable int listId, @PathVariable int movieId) {
        // Find the movie list by its ID
        MovieList movieList = movieListRepository.findById(listId)
                .orElseThrow(() -> new RuntimeException("List not found"));

        if (movieList.getMovieId() == movieId) {
            movieListRepository.delete(movieList);
            return ResponseEntity.ok("Movie removed from the list successfully.");
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Movie ID does not match the list.");
        }
    }


}
