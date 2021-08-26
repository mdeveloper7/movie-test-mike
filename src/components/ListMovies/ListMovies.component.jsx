import React from "react";
import { debounce } from "lodash";
import axios from "axios";
import { Link } from "react-router-dom";
import "./ListMovies.css";

export default class ListMovies extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      movies: [],
      searchText: "",
    };
  }

  componentDidMount() {
    axios.get(`http://happycondo-001-site4.etempurl.com/api/Movies`).then(
      (response) => {
        this.setState({ movies: response.data });
      },
      (error) => {
        console.log(error);
      }
    );
  }

  handleSearch = debounce((event) => {
    const { value } = event.target;
    this.setState({ searchText: value });
  }, 700);

  // search can be a separated component
  render() {
    const { movies, searchText } = this.state;
    const filteredMovies = searchText
      ? movies.filter((movie) =>
          movie.film
            .toLocaleLowerCase()
            .includes(searchText.toLocaleLowerCase())
        )
      : movies;
    return (
      <>
        <div className="search-header">
          <label htmlFor="search">
            Search your favorite movie by film name:{" "}
          </label>
          <input
            type="text"
            className="search-input"
            onChange={this.handleSearch}
          />
        </div>
        <h3>Movie list</h3>
        <div className="list">
          {filteredMovies.length > 0 &&
            filteredMovies.map((movie, idx) => {
              return (
                <div key={`movie-${idx}`}>
                  <Link
                  to={{ 
                    pathname: `/details/${movie.Id}`, 
                    query: {
                      movie: movie
                    } 
                  }}>{movie.Film}</Link>
                </div>
              );
            })}
        </div>
      </>
    );
  }
}
