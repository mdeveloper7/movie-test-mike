import { BrowserRouter, Switch, Route } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar.component.jsx";
import ListMovies from "../components/ListMovies/ListMovies.component.jsx";
import MovieDetail from "../components/MovieDetail/MovieDetail.component.jsx";

function Movie() {
  return (
    <BrowserRouter>
      <Navbar title="Movie App" />
      <Switch>
        <Route path="/" exact component={ListMovies} />
        <Route path="/details/:id" component={MovieDetail} />
      </Switch>
    </BrowserRouter>
  );
}

export default Movie;
