import React, { useState, useEffect } from 'react';
import axios from 'axios';

const initialMovie = {
  id: "",
  title: "",
  director: "",
  metascore: "",
  star1: "",
  star2: "",
  star3: ""
}

const UpdateMovie = props => {
  const [movie, setMovie] = useState(initialMovie);
  const movieID = props.match.params.id;

  useEffect( () => {
    axios
      .get(`http://localhost:5000/api/movies/${movieID}`)
      .then ( res => {
        console.log(res.data);
        setMovie ({
          // ...movie,
          id: res.data.id,
          title: res.data.title,
          director: res.data.director,
          metascore: res.data.metascore,
          star1: res.data.stars[0],
          star2: res.data.stars[1],
          star3: res.data.stars[2]
        })
      })
      .catch( err=>console.error(err) );
  }, [movieID]);
        
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
      .put(`http://localhost:5000/api/movies/${movieID}`, {
        id: movie.id,
        title: movie.title,
        director: movie.director,
        metascore: movie.metascore,
        stars: [movie.star1, movie.star2, movie.star3]
      })
      .then( res => {
        console.log(res);
        props.history.push(`/`);
      })
      .catch( err => console.error(err));
  }

  return (
    <div className="save-wrapper">
      <div className="movie-card update">
        <h2>Update Movie</h2>
        <form onSubmit={submitHandler}>
          <label for="title">
            <span>Title</span>
            <input
              type="text"
              name="title"
              onChange={changeHandler}
              placeholder="Title"
              value={movie.title}
            />
          </label>

          <label for="director">
            <span>Director</span>
            <input
              type="text"
              name="director"
              onChange={changeHandler}
              placeholder="Director"
              value={movie.director}
            />
          </label>

          <label for="metascore">
            <span>Metascore</span>
            <input
              type="number"
              name="metascore"
              onChange={changeHandler}
              placeholder="Metascore"
              value={movie.metascore}
            />
          </label>

          <label for="star1">
            <span>Star 1</span>
            <input
              type="string"
              name="star1"
              onChange={changeHandler}
              placeholder="Star 1"
              value={movie.star1}
            />
          </label>

          <label for="star2">
            <span>Star 2</span>
            <input
              type="string"
              name="star2"
              onChange={changeHandler}
              placeholder="Star 1"
              value={movie.star2}
            />
          </label>

          <label for="star3">
            <span>Star 3</span>
            <input
              type="string"
              name="star3"
              onChange={changeHandler}
              placeholder="Star 3"
              value={movie.star3}
           />
          </label>

          <button className="form-button">Update</button>
        </form>
      </div>
    </div>
  )


}

export default UpdateMovie;