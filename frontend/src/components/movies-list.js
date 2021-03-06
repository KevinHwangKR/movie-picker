import React, { useState, useEffect } from "react"
import MovieDataService from "../services/movie"
import { Link } from "react-router-dom"

const MoviesList = props => {
    const [movies, setMovies] = useState([]);
    const [searchTitle, setSearchTitle] = useState("");
    const [searchGenre, setSearchGenre] = useState("");
    const [searchDirector, setSearchDirector] = useState("");
    const [genres, setGenres] = useState(["All Genres"]);

    useEffect(() => {
        retrieveGenres();
    }, []);

    const onChangeSearchTitle = e => {
        const searchTitle = e.target.value;
        setSearchTitle(searchTitle);
    };

    const onChangeSearchGenre = e => {
        const searchGenre = e.target.value;
        setSearchGenre(searchGenre);
    };

    const onChangeSearchDirector = e => {
        const searchDirector = e.target.value;
        setSearchDirector(searchDirector);

    };

    const retrieveGenres = () => {
        MovieDataService.getGenres()
            .then(response => {
                console.log(response.data);
                setGenres(["Search by genre"].concat(response.data));

            })
            .catch(e => {
                console.log(e);
            });
    };

    const find = (query, by) => {
        MovieDataService.find(query, by)
            .then(response => {
                console.log(response.data);
                setMovies(response.data.movies);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const findByTitle = () => {
        find(searchTitle, "title")
    };

    const findByGenre = () => {
        find(searchGenre, "genre")
    };

    const findByDirector = () => {
        find(searchDirector, "director")
    };

    return (
        <div>
            <div className="row pb-1">
                <div className="input-group col-lg-4">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search by title"
                        value={searchTitle}
                        onChange={onChangeSearchTitle}
                    />
                    <div className="input-group-append">
                        <button
                            className="btn btn-outline-secondary"
                            type="button"
                            onClick={findByTitle}
                        >
                            Search
                        </button>
                    </div>
                </div>

                <div className="input-group col-lg-4">

                    <select onChange={onChangeSearchGenre}>
                        {genres.map(genre => {
                            return (
                                <option value={genre}>{genre}</option>
                            )
                        })}
                    </select>


                    <div className="input-group-append">
                        <button
                            className="btn btn-outline-secondary"
                            type="button"
                            onClick={findByGenre}
                        >
                            Search
                        </button>
                    </div>
                </div>

                <div className="input-group col-lg-4">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search by director"
                        value={searchDirector}
                        onChange={onChangeSearchDirector}
                    />

                    <div className="input-group-append">
                        <button
                            className="btn btn-outline-secondary"
                            type="button"
                            onClick={findByDirector}
                        >
                            Search
                        </button>
                    </div>
                </div>
            </div>


            <div className="row">
                {movies.map((movie) => {
                    return (
                        <div className="col-lg-4 pb-1">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">{movie.title}</h5>
                                    <p className="card-text">
                                        <strong>Director: </strong>{movie.directors} <br />
                                        <strong>Genre: </strong>{movie.genres}<br />
                                        <strong>Imdb Rating: </strong>{movie.imdb.rating}/10<br />
                                        <strong>Year: </strong>{movie.year}<br />
                                        <strong>Runtime: </strong>{movie.runtime} minutes<br />
                                    </p>
                                        <div className="row">
                                            <Link to={"/movies/" + movie._id} className="btn btn-primary col-lg-5 mx-1 mb-1">
                                            View Reviews
                                            </Link>
                                        <a target="_blank" href={"https://www.google.com/search?q=" + movie.title} className="btn btn-primary col-lg-5 mx-1 mb-1" rel="noreferrer">View Movie Info</a>
                                        </div>
                                </div>
                            </div>
                        </div>
                    );
                })}


            </div>
        </div>
    );
};

export default MoviesList;