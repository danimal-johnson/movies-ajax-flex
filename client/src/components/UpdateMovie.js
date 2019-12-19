import React, { useState, useEffect } from 'react';
import axios from 'axios';

const initialMovie = {
  title: "",
  director: "",
  metascore: "",  // TODO: Convert to number
  star1: "",
  star2: "",
  star3: ""
}

const UpdateMovie = props => {
  const [movie, setMovie] = useState(initialMovie);
  console.log("UpdateMovie props", props);

  // TODO: useEffect()

  useEffect( () => {
    const movieToEdit = props.movies.find(
      movie => `${movie.id}` === props.match.params.id
    );
  }, [props.movies, props.match.movies.id])

  const changeHandler = e => {
    e.persist(); //TODO: Find out what this does
    setMovie({
      ...movie,
      [e.target.name]: e.target.value
    });
  }

  const submitHandler = e => {
    e.preventDefault();
    axios
      .put(`http://localhost/movies/${movie.id}`, {
        title: movie.title,
        director: movie.director,
        metascore: movie.metascore,
        stars: [movie.star1, movie.star2, movie.star3]
      })
      .then( res => {
        console.log(res);
        // TODO: props.[update local copy of data]
        props.history.push(`/movies`);
      })
      .catch( err => console.error(err));
  }

  return (
    <div>
    <h2>Update Movie</h2>
    <form onSubmit={submitHandler}>
      <input
        type="text"
        name="title"
        onChange={changeHandler}
        placeholder="Title"
        value={movie.title}
      />

      <input
        type="text"
        name="director"
        onChange={changeHandler}
        placeholder="Director"
        value={movie.director}
      />

      <input
        type="number"
        name="metascore"
        onChange={changeHandler}
        placeholder="Metascore"
        value={movie.metascore}
      />

      <input
        type="string"
        name="star1"
        onChange={changeHandler}
        placeholder="Star 1"
        value={movie.star1}
      />

      <input
        type="string"
        name="star2"
        onChange={changeHandler}
        placeholder="Star 1"
        value={movie.star2}
      />

      <input
        type="string"
        name="star3"
        onChange={changeHandler}
        placeholder="Star 3"
        value={movie.star3}
      />

      <button className="form-button">Update</button>
    </form>
  </div>
  )


}

export default UpdateMovie;