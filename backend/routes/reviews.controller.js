import ReviewDAO from "../dao/reviewDAO.js"

export default class ReviewsController { 

    static async apiGetReviews(req, res, next) {
 
        try {
            const reviewResponse = await ReviewDAO.getReviews()
            res.json(reviewResponse)
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    }

    static async apiPostReview(req, res, next) {
        try {
            const movieId = req.body.movie_id
            const star = req.body.star
            const userInfo = {
                name: req.body.name,
                _id: req.body.user_id
            }
            const date = new Date()

            const reviewResponse = await ReviewDAO.addReview(
                movieId,
                userInfo,
                star,
                date,
            )
            res.json({ status: "success" })
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    }

    static async apiUpdateReview(req, res, next) {
        try {
            const reviewId = req.body.review_id
            const star = req.body.star
            const date = new Date()

            const reviewResponse = await ReviewDAO.updateReview(
                reviewId,
                req.body.user_id,
                star,
                date,
            )

            var { error } = reviewResponse
            if (error) {
                res.status(400).json({ error })
            }

            if (reviewResponse.modifiedCount === 0) {
                throw new Error(
                    "unable to update review - user may not be original poster",
                )
            }

            res.json({ status: "success" })
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    }

    static async apiDeleteReview(req, res, next) {
        try {
            const reviewId = req.query.id
            const userId = req.body.user_id
            console.log(reviewId)
            const reviewResponse = await ReviewDAO.deleteReview(
                reviewId,
                userId,
            )
            res.json({ status: "success" })
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    }

}
