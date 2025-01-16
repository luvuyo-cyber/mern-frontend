import React, { useState } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import AddReview from "./components/add-review";
import MoviesList from "./components/movies-list";
import Movie from "./components/movie";
import Login from "./components/login";

function App() {
  const [user, setUser] = useState(null); //declare user state variable using react hooks

  async function login(user = null) {
    //default user to null
    setUser(user);
  }

  async function logout() {
    setUser(null);
  }
  return (
    <div className="App">
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">Movie Reviews</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link>
                <Link to={"/movies"}>Movies</Link>
              </Nav.Link>
              {/* replace Login/Logout depending on the user's login state*/}
              <Nav.Link>
                {user ? (
                  <a onClick={logout}>Logout User</a>
                ) : (
                  <Link to={"/login"}>Login</Link>
                )}
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Switch>
        <Route exact path={["/", "movies"]} component={MoviesList}></Route>
        <Route
          path="/movies/:id/review"
          render={(props) => <AddReview {...props} user={user} />}
        ></Route>
        <Route
          path="/movies/:id/"
          render={(props) => <Movie {...props} user={user} />}
        ></Route>
        {/* pass login function as a prop */}
        <Route
          path="/login"
          render={(props) => <Login {...props} login={login} />}
        ></Route>
      </Switch>
    </div>
  );
}

export default App;
