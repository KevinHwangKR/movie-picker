import http from "../http-common"

class MovieDataService {
    getAll(page = 0) {
        return http.get(`?page=${page}`);
    }

    get(id) {
        return http.get(`/id=${id}`);
    }

    find(query, by, page = 0) {
        
        console.log("BY: ", by)
        console.log("QUERY: ", query)

        return http.get(`?${by}=${query}&page=${page}`);
    }

    createReview(data) {
        return http.post("/review", data);
    }

    updateReview(data) {
        return http.put("/review", data);
    }

    deleteReview(id, userId) {
        return http.delete(`/review?id=${id}`);
    }

    getGenres(id) {
        return http.get(`/genres`);
    }

    getDirectors(id) {
        return http.get(`/directors`);
    }
}

export default new MovieDataService();