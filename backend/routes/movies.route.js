import express from "express"
import MoviesController from "./movies.controller.js"
import ReviewsController from "./reviews.controller.js"

const router = express.Router()

router.route("/").get(MoviesController.apiGetMovies)
router.route("/id/:id").get(MoviesController.apiGetMovieById)
router.route("/genres").get(MoviesController.apiGetGenres)
router.route("/directors").get(MoviesController.apiGetDirectors)

router
    .route("/review")
    .get(ReviewsController.apiGetReviews)
    .post(ReviewsController.apiPostReview)
    .put(ReviewsController.apiUpdateReview)
    .delete(ReviewsController.apiDeleteReview)

export default router