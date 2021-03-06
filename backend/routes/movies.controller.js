import MovieDAO from "../dao/movieDAO.js"

export default class MoviesController {
    static async apiGetMovies(req, res, next) {
        const moviesPerPage = req.query.moviesPerPage ? parseInt(req.query.moviesPerPage, 10) : 20
        const page = req.query.page ? parseInt(req.query.page, 10) : 0

        let filters = {}
        if (req.query.title) {
            filters.title = req.query.title
        } else if (req.query.director) {
            filters.director = req.query.director
        } else if (req.query.genre) {
            filters.genre = req.query.genre
        }

        const { moviesList, totalNumMovies } = await MovieDAO.getMovies({
            filters,
            page,
            moviesPerPage,
        })

        let response = {
            movies: moviesList,
            page: page,
            filters: filters,
            entries_per_page: moviesPerPage,
            total_results: totalNumMovies
        }
        res.json(response)
    }
    static async apiGetMovieById(req, res, next) {
        try {
            let id = req.params.id || {}
            let movie = await MovieDAO.getMovieByID(id)
            if (!movie) {
                res.status(404).json({ error: "Not found" })
                return
            }
            res.json(movie)
        } catch (e) {
            res.status(500).json({ error: e })
        }
    }

    static async apiGetGenres(req, res, next) {
        try {
            let genres = await MovieDAO.getGenres()
            res.json(genres)
        } catch (e) {
            console.log(`api, ${e}`)
            res.status(500).json({ error: e })
        }
    }

    static async apiGetDirectors(req, res, next) {
        try {
            let directors = await MovieDAO.getDirectors()
            res.json(directors)
        } catch (e) {
            console.log(`api, ${e}`)
            res.status(500).json({ error: e })
        }
    }
}