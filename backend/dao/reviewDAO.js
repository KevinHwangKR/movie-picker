import mongodb from "mongodb"
const ObjectId = mongodb.ObjectId

let reviews

export default class ReviewsDAO {
    static async injectDB(conn) {
        if (!reviews) {
            try {
                reviews = await conn.db(process.env.MOVIES_DB).collection("reviews")
            } catch (e) {
                console.error(`Unable to establish collection handles in userDAO: ${e}`)
            }
        }
    }

    static async getReviews() {
        try {
            let cursor = reviews.find()
            return cursor.toArray()
        } catch (e) {
            console.error(`Unable to get review: ${e}`)
            return { error: e }
        }
    }

    static async addReview(movieId, user, star, date) {
        try {
            const reviewDoc = {
                name: user.name,
                user_id: user._id,
                date: date,
                star: star,
                movie_id: ObjectId(movieId), }

            return await reviews.insertOne(reviewDoc)
        } catch (e) {
            console.error(`Unable to add review: ${e}`)
            return { error: e }
        }
    }

    static async updateReview(reviewId, userId, star, date) {
        try {
            const updateResponse = await reviews.updateOne(
                { user_id: userId, _id: ObjectId(reviewId) },
                { $set: { star: star, date: date } },
            )

            return updateResponse
        } catch (e) {
            console.error(`Unable to update review: ${e}`)
            return { error: e }
        }
    }

    static async deleteReview(reviewId, userId) {

        try {
            const deleteResponse = await reviews.deleteOne({
                _id: ObjectId(reviewId),
                user_id: userId,
            })

            return deleteResponse
        } catch (e) {
            console.error(`Unable to delete review: ${e}`)
            return { error: e }
        }
    }

}