import React from 'react';
import './movie-view'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import { Col, Row, Container, } from 'react-bootstrap'
import { Link } from "react-router-dom";
import './movie-view.scss'



//need to fix link paths


export class MovieView extends React.Component {

    render() {
        const { movie, onBackClick } = this.props;
        return (
            <Container>
                <Row>
                    <Col></Col>
                    <Col>
                        <Card style={{ marginTop: 100, marginBottom: 100, width: 300 }}>
                            <Card.Img variant="top" src={movie.ImagePath} />
                            <Card.Body className="movieViewCardStyle">
                                <Card.Title>{movie.Title}</Card.Title>
                                <Card.Text>{movie.Description}</Card.Text>
                                <Link to={`/directors/${movie.Director.Name}`}>
                                    <Button variant="link">Director</Button>
                                </Link>
                                <Link to={`/genres/${movie.Genre.Name}`}>
                                    <Button variant="link">Genre</Button>
                                </Link>

                            </Card.Body>
                        </Card>
                    </Col>
                    <Col></Col>
                </Row>
            </Container >
        )

    }
}