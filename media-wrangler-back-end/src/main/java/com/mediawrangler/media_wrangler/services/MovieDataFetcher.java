package com.mediawrangler.media_wrangler.services;

import com.mediawrangler.media_wrangler.models.Movie;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.stereotype.Service;

@Service
public class MovieDataFetcher {

    private static final String API_READ_ACCESS_KEY = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNGY4N2NjNmIxZTZhMzQyMThjNjdjYWM1NGMwYzE0ZiIsIm5iZiI6MTczNDE5MTM5MS43NzcsInN1YiI6IjY3NWRhOTFmZjFiZjk2ZGMyNDc4MTA4ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4trA-9bv10lqcfQyhPxFTeKRWMyyPjIhgM_3Vri9Y6Y";

    // overloaded method to fetch movie data by movie title (String)
    public static Movie fetchMovieData(String movieTitle) {
        OkHttpClient client = new OkHttpClient();

        // search for the movie ID using the movie title
        int movieId = searchMovieIdByTitle(client, movieTitle);
        if (movieId == -1) {
            System.out.println("Movie not found.");
            return null;
        }

        // fetch movie details using movieId
        return fetchMovieDetails(client, movieId);
    }

    // Overloaded method to fetch movie data by movie ID (int)
    public static Movie fetchMovieData(int movieId) {
        OkHttpClient client = new OkHttpClient();

        // fetch movie details using movieId
        return fetchMovieDetails(client, movieId);
    }

    // searches for a movie ID by title
    private static int searchMovieIdByTitle(OkHttpClient client, String title) {
        String apiUrl = "https://api.themoviedb.org/3/search/movie?" + "query=" + title + "&language=en-US";

        Request request = new Request.Builder()
                .url(apiUrl)
                .header("Authorization", "Bearer " + API_READ_ACCESS_KEY)
                .build();

        // sends http request to server and receieves response
        try (Response response = client.newCall(request).execute()) {
            if (!response.isSuccessful()) {
                System.out.println("Search request failed with status: " + response.code());
                return -1;
            }

            // parse search results
            String responseBody = response.body().string();
            JSONObject jsonResponse = new JSONObject(responseBody);

            // check if the result contains movies
            JSONArray results = jsonResponse.getJSONArray("results");
            if (results.length() > 0) {
                // Return the ID of the first movie found
                return results.getJSONObject(0).getInt("id");
            } else {
                System.out.println("No movies found with that title.");
                return -1;
            }

        } catch (Exception e) {
            e.printStackTrace();
            return -1;
        }
    }

    // fetches movie details by ID
    private static Movie fetchMovieDetails(OkHttpClient client, int movieId) {
        String apiUrl = "https://api.themoviedb.org/3/movie/" + movieId + "?" + "&language=en-US";

        Request request = new Request.Builder()
                .url(apiUrl)
                .get()
                .addHeader("accept", "application/json")
                .addHeader("Authorization","Bearer " + API_READ_ACCESS_KEY)
                .build();

        try (Response response = client.newCall(request).execute()) {
            if (!response.isSuccessful()) {
                System.out.println("Request failed with status: " + response.code());
                return null;
            }

            // parse the movie details response
            String responseBody = response.body().string();
            JSONObject jsonResponse = new JSONObject(responseBody);

            // Extract movie data
            String title = jsonResponse.getString("title");
            String releaseDate = jsonResponse.getString("release_date");
            double rating = jsonResponse.getDouble("vote_average");
            String overview = jsonResponse.getString("overview");
            String posterPath = jsonResponse.getString("poster_path");

            // return Movie object with data
            return new Movie(movieId, title, releaseDate, rating, overview, posterPath);

        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}




