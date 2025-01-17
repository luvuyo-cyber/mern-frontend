//component to list a single movie

import React, { useState, useEffect } from "react";
import MovieDataService from "../services/movies";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Media from "react-bootstrap/Media";
import Image from "react-bootstrap/Image";

const Movie = (props) => {
  const [movie, setMovie] = useState({
    id: null,
    title: "",
    rated: "",
    reviews: [],
  });

  //calls get() of services, which calls API route for a single movie, called in useEffect
  const getMovie = (id) => {
    MovieDataService.get(id)
      .then((response) => {
        setMovie(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  //called when component renders, and the state variale changes
  useEffect(() => {
    getMovie(props.match.params.id);
  }, [props.match.params.id]); //wont call getMovie() multiple times, unless id is updated

  return (
    <div>
      <Container>
        <Row>
          {/* movie poster */}
          <Col>
            <Image src={movie.poster + "/100px250"} fluid />
          </Col>
          {/* movie details */}
          <Col>
            <Card>
              <Card.Header as="h5">{movie.title}</Card.Header>
              <Card.Body>
                <Card.Text>{movie.plot}</Card.Text>
                {/* if user is logged in/props.user is true, include "Add Review" */}
                {props.user && (
                  <Link to={"/movies/" + props.match.params.id + "/review"}>
                    Add Review
                  </Link>
                )}
              </Card.Body>
            </Card>
            <br></br>
            <h2>Reviews</h2>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Movie;
