import React from "react";
import axios from "axios";
import "./MovieDetail.css";

export default class MovieDetail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      movie: {},
      comments: [],
      name: "",
      comment: "",
    };
  }

  handleChange = (event) => {
    const { value, name } = event.target;
    this.setState({ [name]: value });
  };

  componentDidMount() {
    let movie = {};

    const { location } = this.props;
    if (!location.query) {
      this.props.history.push("/");
    } else {
      // console.log(this.props.location.query.movie);
      movie = this.props.location.query.movie;
    }

    axios.get(`http://happycondo-001-site4.etempurl.com/api/Comments?movieId=${movie.Id}`).then(
      (response) => {
        this.setState({ movie: movie, comments: response.data });
      },
      (error) => {
        console.log(error);
      }
    );
  }

  postComment = (event) => {
    event.preventDefault();

    const { comment, name, movie } = this.state;
    if (comment && name) {
      const newComment = {Name: name, CommentDescription: comment, MovieId: movie.Id }
      axios.post(`http://happycondo-001-site4.etempurl.com/api/Comments`, newComment).then(
        (response) => {
          if(response) {
            this.setState({ comment: '', name: '' });
            alert('Comment was added');
          }
        },
        (error) => {
          console.log(error);
        }
      );
    }
  };

  // search can be a separated component
  render() {
    const { movie, comments } = this.state;
    return (
      <>
        <div className="card">
          <div className="container">
            {movie && (
              <>
                <h2>{movie.Film}</h2>
                <div className="card-content">
                  <div>Genre: {movie.Genre}</div>
                  <div>Lead Studio: {movie.LeadStudio}</div>
                  <div>Audience Score: {movie.AudienceScore}</div>
                  <div>Profitability: {movie.Profitability}</div>
                  <div>Rotten Tomatoes: {movie.RottenTomatoes}</div>
                  <div>Movie worlwide gross: {movie.WorldwideGross}</div>
                  <div>Year: {movie.Year}</div>
                </div>
              </>
            )}
          </div>
        </div>
        <div className="comments">
          <div>
            <h2>Comments</h2>
          </div>
          {/* It can be a separate component too */}
          <form>
            <span className="comment-text">Post Comment: </span>
            <input
              className="comment-text"
              onChange={this.handleChange}
              name="name"
              type="text"
              required
              placeholder="Name"
              value={this.state.name}
            />
            <input
              className="comment-text"
              name="comment"
              onChange={this.handleChange}
              type="text"
              required
              placeholder="Comment"
              value={this.state.comment}
            />
            <button className="comment-text" onClick={this.postComment}>
              Send
            </button>
          </form>
          <div className="comment-content">
            {comments.length > 0 &&
              comments.map((comment, idx) => {
                return (
                  <div className="comment" key={`comment-${idx}`}>
                    <div className="comment-data">{`Name: ${comment.Name}`}</div>
                    <div className="comment-data">
                      <div className="comment-description">{`Comment: ${comment.CommentDescription}`}</div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </>
    );
  }
}
