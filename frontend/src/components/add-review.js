import React, { useState } from "react";
import MovieDataService from "../services/movie";
import { Link } from "react-router-dom";

const AddReview = props => {
    let initialReviewState = ""

    let editing = false;

    if (props.location.state && props.location.state.currentReview) {
        editing = true;
        initialReviewState = props.location.state.currentReview.text
    }

    const [review, setReview] = useState(initialReviewState);
    const [submitted, setSubmitted] = useState(false);

    const handleInputChange = event => {
        setReview(event.target.value);
    };

    const saveReview = () => {
        if (review >= 0 && review <= 5) {
            var data = {
                name: props.user.name,
                user_id: props.user.id,
                movie_id: props.match.params.id,
                star: review

            };

            if (editing) {
                data.review_id = props.location.state.currentReview._id
                MovieDataService.updateReview(data)
                    .then(response => {
                        setSubmitted(true);
                        console.log(response.data);
                    })
                    .catch(e => {
                        console.log(e);
                    });
            } else {
                MovieDataService.createReview(data)
                    .then(response => {
                        setSubmitted(true);
                        console.log(response.data);
                    })
                    .catch(e => {
                        console.log(e);
                    });
            }     
        } else {
            alert("Review must be from 0 to 5")
        }
    };

    return (
        <div>
            {props.user ? (
                <div className="submit-form">
                    {submitted ? (
                        <div>
                            <h4>You submitted successfully!</h4>
                            <Link to={"/movies/" + props.match.params.id} className="btn btn-success">
                                Back to Movie
                            </Link>
                        </div>
                    ) : (
                        <div>
                            <div className="form-group">
                                <label htmlFor="description">{editing ? "Edit" : "Create"} Review</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="text"
                                    required
                                    value={review}
                                    onChange={handleInputChange}
                                    name="text"
                                />
                            </div>
                            <button onClick={saveReview} className="btn btn-success">
                                Submit
                            </button>
                        </div>
                    )}
                </div>

            ) : (
                <div>
                    Please log in.
                </div>
            )}

        </div>
    );
};

export default AddReview;