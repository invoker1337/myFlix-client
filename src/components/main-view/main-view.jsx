import React from 'react';
import axios from 'axios';

import { BrowserRouter as Router, Route } from "react-router-dom";

import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export class MainView extends React.Component {

    constructor() {
        super();

        this.state = {
            movies: [],
            user: null
        };
    }



    componentDidMount() {
        let accessToken = localStorage.getItem('token');
        if (accessToken !== null) {
            this.setState({
                user: localStorage.getItem('user')
            });
            this.getMovies(accessToken);
        }
    }



    onLoggedIn(authData) {
        console.log(authData);
        this.setState({
            user: authData.user.Username
        });

        localStorage.setItem('token', authData.token);
        localStorage.setItem('user', authData.user.Username);
        this.getMovies(authData.token);
    }


    onLoggedOut() {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        this.setState({
            user: null,
        });
        window.open("/", "_self");
    }

    onRegistration(register) {
        this.setState({
            register
        });
    }


    getMovies(token) {
        axios.get('https://invoker1337.herokuapp/movies', {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => {
                // Assign the result to the state
                this.setState({
                    movies: response.data
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }










    render() {
        const { movies, user } = this.state;
        if (!user)
            return (
                <div>
                    <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                    <RegistrationView />
                </div>
            );

        if (movies.length === 0) return <div className="main-view" />;

        return (
            <div>
                <Router>
                    <Row className="main-view justify-content-md-center">


                        <Route exact path="/" render={() => {
                            return movies.map(m => (
                                <Col md={3} key={m._id}>
                                    <MovieCard movie={m} />
                                </Col>
                            ))
                        }} />

//paths need to be adjusted!
                        <Route exact path="/movies/:movieId" render={({ match, history }) => {
                            return <Col md={8}>
                                <MovieView movie={movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack()} />
                            </Col>
                        }} />


                        <Route exact path="/movies/genre/:Name" render={({ match, history }) => {
                            return <Col md={8}>
                                <GenreView movie={movies.find(m => m._id === match.params.movieId)} />
                            </Col>
                        }} />
                        <Route exact path="/directors/:Name" render={({ match, history }) => {
                            if (directors.length === 0) return <div className="main-view" />
                            return <Col md={8}>
                                <DirectorView Director={directors.find(m => m.Director.Name === match.params.Name).Director} onBackClick={() => history.goBack()
                                } />
                            </Col>
                        }} />
                    </Row>
                </Router>
            </div>
        );
    }
}