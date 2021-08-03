import mongodb from "mongodb"
const ObjectId = mongodb.ObjectId
let movies

export default class MovieDAO {
    static async injectDB(conn) {
        if (!movies) {
            try {
                movies = await conn.db(process.env.MOVIES_DB).collection("movies")
            } catch (e) {
                console.error(e)
            }        
        }
    }

    static async getMovies({
        filters = null,
        page = 0,
        moviesPerPage = 20,
    } = {}) {
        let query
        if (filters) {
            if ("title" in filters) {
                query = { $text: { $search: filters["title"] } }
            } else if ("directors" in filters) {
                query = { "directors": { $eq: filters["directors"] } }
            } else if ("genres" in filters) {
                query = { "genres": { $eq: filters["genres"] } }
            }
        }

        let cursor

        try {
            cursor = await movies
                .find(query)
        } catch (e) {
            console.error(e)
            return { moviesList: [], totalNumMovies: 0 }
        }

        const displayCursor = cursor.limit(moviesPerPage).skip(moviesPerPage * page)

        try {
            const moviesList = await displayCursor.toArray()
            const totalNumMovies = await movies.countDocuments(query)

            return { moviesList, totalNumMovies }
        } catch (e) {
            console.error(e)
            return { moviesList: [], totalNumMovies: 0 }
        }
    }

    static async getMovieByID(id) {
        try {
            const pipeline = [
                {
                    $match: {
                        _id: new ObjectId(id),
                    },
                },
                {
                    $lookup: {
                        from: "reviews",
                        let: {
                            id: "$_id",
                        },
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $eq: ["$movie_id", "$$id"],
                                    },
                                },
                            },
                            {
                                $sort: {
                                    date: -1,
                                },
                            },
                        ],
                        as: "reviews",
                    },
                },
                {
                    $addFields: {
                        reviews: "$reviews",
                    },
                },
            ]
            return await movies.aggregate(pipeline).next()
        } catch (e) {
            console.error(`Unable to get movie by id: ${e}`)
            throw e
        }
    }

    static async getGenres() {
        let genres = []
        try {
            genres = await movies.distinct("genres")
            return genres
        } catch (e) {
            console.error(`Unable to get genres, ${e}`)
            return genres
        }
    }

    static async getDirectors() {
        let directors = []
        try {
            directors = await movies.distinct("directors")
            return directors
        } catch (e) {
            console.error(`Unable to get directors, ${e}`)
            return directors
        }
    }
}